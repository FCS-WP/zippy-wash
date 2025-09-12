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

        $args = [];

        if (!empty($cat_id)) {
            $args['product_category_id'] = [$cat_id];
        }

        // Lấy sản phẩm
        $wc_products = wc_get_products($args);

        if (empty($wc_products)) {
            return Zippy_Response_Handler::success([], 'No products found.');
        }

        $products = array_map(function ($product) {
            return [
                'id'             => $product->get_id(),
                'name'           => $product->get_name(),
                'price'          => $product->get_price(),
                'formatted_price'=> wc_price($product->get_price()),
                'img'            => wp_get_attachment_url($product->get_image_id()),
                'categories'     => wp_get_post_terms($product->get_id(), 'product_cat', ['fields' => 'slugs']),
                'desc'           => $product->get_description(),
                'stock_status'   => $product->get_stock_status(),
            ];
        }, $wc_products);

        return Zippy_Response_Handler::success($products, 'Fetched products successfully');
    }
}
