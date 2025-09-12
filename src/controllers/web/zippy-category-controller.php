<?php
/**
 * API Category Controller
 *
 * @package Shin
 */

namespace ZIPPY_WASH\Src\Controllers\Web;

defined('ABSPATH') or die();

use WP_REST_Request;
use WP_REST_Response;
use ZIPPY_WASH\Src\App\Zippy_Response_Handler;

class Zippy_Category_Controller
{
    /**
     * Get WooCommerce product categories
     */
    public static function get_categories(WP_REST_Request $request)
    {
        try {
            $args = [
                'taxonomy'   => 'product_cat',
                'hide_empty' => false,
            ];

            $terms = get_terms($args);

            if (is_wp_error($terms)) {
                return Zippy_Response_Handler::error($terms->get_error_message());
            }

            // Build map id => term
            $categories = [];
            foreach ($terms as $term) {
                $categories[$term->term_id] = [
                    'id'          => $term->term_id,
                    'name'        => $term->name,
                    'slug'        => $term->slug,
                    'description' => $term->description,
                    'count'       => $term->count,
                    'parent'      => $term->parent,
                    'children'    => [],
                    'img'         => get_term_meta($term->term_id, 'thumbnail_id', true) 
                                        ? wp_get_attachment_url(get_term_meta($term->term_id, 'thumbnail_id', true)) 
                                        : null,
                ];
            }

            // Xây dựng cây category
            $tree = [];
            foreach ($categories as $id => &$cat) {
                if ($cat['parent'] && isset($categories[$cat['parent']])) {
                    $categories[$cat['parent']]['children'][] = &$cat;
                } else {
                    $tree[] = &$cat;
                }
            }

            return Zippy_Response_Handler::success($tree, 'Fetched categories successfully');
        } catch (\Exception $e) {
            return Zippy_Response_Handler::error($e->getMessage());
        }
    }
}