<?php
/**
 * API Product Controller
 *
 * @package Shin
 */

namespace ZIPPY_WASH\Src\Controllers\Web;

defined('ABSPATH') or die();

use WP_REST_Request;
use WP_Query;
use ZIPPY_WASH\Src\App\Zippy_Response_Handler;
use ZIPPY_WASH\Utils\Zippy_Session_Handler;

class Zippy_Product_Controller
{
    /**
     * Get WooCommerce products by category
     */
    public static function get_products_by_category(WP_REST_Request $request)
    {
        $cat_id = $request->get_param('category_id');
        $cat_slug = $request->get_param('category_slug');
        $page = $request->get_param('page') ? (int) $request->get_param('page') : 1;
        $limit = $request->get_param('limit') ? (int) $request->get_param('limit') : 10;

        $args = [
            'page'    => $page,
            'limit'   => $limit,
        ];

        if (!empty($cat_id)) {
            $args['product_category_id'] = [$cat_id];
        }

        if (!empty($cat_slug)) {
            $args['category'] = [$cat_slug];
        }

        $products_page = wc_get_products($args);

        $count_args = $args;
        $count_args['limit'] = -1;
        $total_products = count(wc_get_products($count_args));
        $total_pages = ceil($total_products / $limit);

        $products = array_map(function ($product) {
            return [
                'id'             => $product->get_id(),
                'name'           => $product->get_name(),
                'price'          => $product->get_price(),
                'formatted_price'=> wc_price($product->get_price()),
                'img'            => $product->get_image_id() ? wp_get_attachment_url($product->get_image_id()) : wc_placeholder_img_src(),
                'categories'     => wp_get_post_terms($product->get_id(), 'product_cat', ['fields' => 'slugs']),
                'desc'           => $product->get_description(),
                'stock_status'   => $product->get_stock_status(),
            ];
        }, $products_page);

        return Zippy_Response_Handler::success([
            'products'    => $products,
            'total'       => $total_products,
            'per_page'    => $limit,
            'page'        => $page,
            'total_pages' => $total_pages,
        ], 'Fetched products successfully');
    }
}
