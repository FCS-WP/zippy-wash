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
use Zippy_Wash\Utils\Zippy_Cart_Handler;
use ZIPPY_WASH\Utils\Zippy_Session_Handler;
use WC_Cart;

class Zippy_Cart_Controller
{
    public static function add_to_cart(WP_REST_Request $request) 
    {
        try {
            $products = $request->get_param('products');
            if (empty($products) || !is_array($products)) {
                return Zippy_Response_Handler::error('Products data is required.');
            }

            $cart_handler = new Zippy_Cart_Handler();

            echo '<pre>Cart before adding:' . PHP_EOL;
            print_r($cart_handler->get_cart_items());
            echo '</pre>';

            $added_items = [];
            foreach ($products as $product) {
                $product_id = isset($product['id']) ? intval($product['id']) : 0;
                $quantity   = isset($product['qty']) ? intval($product['qty']) : 1;

                if (!$product_id) continue;

                $cart_item_key = $cart_handler->add_to_cart($product_id, $quantity);

                if ($cart_item_key) {
                    $added_items[] = [
                        'product_id'    => $product_id,
                        'quantity'      => $quantity,
                        'cart_item_key' => $cart_item_key,
                    ];
                }
            }

            WC()->cart->calculate_totals();
            WC()->cart->maybe_set_cart_cookies();

            echo '<pre>Cart after adding:' . PHP_EOL;
            print_r($cart_handler->get_cart_items());
            echo '</pre>';

            if (empty($added_items)) {
                return Zippy_Response_Handler::error('Failed to add products to cart.');
            }

            return Zippy_Response_Handler::success($added_items, 'Products added to cart successfully');

        } catch (\Exception $e) {
            return Zippy_Response_Handler::error($e->getMessage());
        }
    }


    public static function get_products_in_cart(WP_REST_Request $request) 
    {
        try {
            if ( ! class_exists('WC_Session_Handler') ) {
                return Zippy_Response_Handler::error('WooCommerce classes not loaded.');
            }

            $cookie_name = 'wp_woocommerce_session_' . COOKIEHASH;
            if ( isset($_COOKIE[$cookie_name]) ) {
                if ( ! WC()->session ) {
                    WC()->session = new \WC_Session_Handler();
                    WC()->session->init();
                }
            } else {
                WC()->session = new \WC_Session_Handler();
                WC()->session->init();
                WC()->session->set_customer_session_cookie(true);
            }

            if ( ! WC()->cart ) {
                wc_load_cart();
            }

            if ( ! WC()->cart || WC()->cart->is_empty() ) {
                return Zippy_Response_Handler::success([], 'Cart is empty.');
            }

            $cart_items = [];
            foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
                $product = $cart_item['data'];
                $cart_items[] = [
                    'id'              => $product->get_id(),
                    'name'            => $product->get_name(),
                    'price'           => $product->get_price(),
                    'formatted_price' => wc_price($product->get_price()),
                    'img'             => wp_get_attachment_url($product->get_image_id()),
                    'categories'      => wp_get_post_terms($product->get_id(), 'product_cat', ['fields' => 'slugs']),
                    'desc'            => $product->get_description(),
                    'stock_status'    => $product->get_stock_status(),
                    'quantity'        => $cart_item['quantity'],
                ];
            }

            return Zippy_Response_Handler::success($cart_items, 'Fetched cart products successfully');

        } catch (\Exception $e) {
            return Zippy_Response_Handler::error($e->getMessage());
        }
    }
}


