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
    public static function add_to_cart(WP_REST_Request $request) {
        $products = $request->get_param('products');

        if (empty($products)) {
            return Zippy_Response_Handler::error('Products is required and must be an array.');
        }

        $zippyCart = new Zippy_Cart_Handler;

        foreach ($products as $product) {
            $found = false;
            $productId = $product['id'];
            $productQty = $product['qty'];
            foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
                if ($cart_item['product_id'] == $productId) {
                    $new_qty = $cart_item['quantity'] + $productQty;
                    $zippyCart->update_cart_item($cart_item_key, $new_qty);
                    $found = true;
                    break;
                }
            }

            if (!$found) {
                $zippyCart->add_to_cart($productId, $productQty);
            }
        }

        return Zippy_Response_Handler::success([], 'Products added to cart successfully');
    }

    public static function get_products_in_cart(WP_REST_Request $request) 
    {
        try {
            global $wpdb;

            $cookies = $request->get_header('cookie');
            $session_key = null;

            if ($cookies && preg_match('/wp_woocommerce_session_[^=]+=([^\s;]+)/', $cookies, $matches)) {
                $session_value = urldecode($matches[1]);
                $parts = explode('||', $session_value);
                if (isset($parts[0])) {
                    $session_key = $parts[0];
                }
            }

            if (!$session_key) {
                return Zippy_Response_Handler::error('No session key found in cookie.');
            }

            $table = $wpdb->prefix . 'woocommerce_sessions';
            $row = $wpdb->get_row(
                $wpdb->prepare("SELECT session_value FROM $table WHERE session_key = %s", $session_key)
            );

            if (!$row) {
                return Zippy_Response_Handler::error('Session not found in database.');
            }

            $session_data = maybe_unserialize($row->session_value);

            $cart_items_serialized = isset($session_data['cart']) ? $session_data['cart'] : '';
            $cart_items = maybe_unserialize($cart_items_serialized);

            $products = [];
            foreach ($cart_items as $cart_item_key => $cart_item) {
                $product = wc_get_product($cart_item['product_id']);
                if (!$product) continue;

                $products[] = [
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

            return Zippy_Response_Handler::success($products, 'Fetched cart products from session successfully');
        } catch (\Exception $e) {
            return Zippy_Response_Handler::error($e->getMessage());
        }
    }


    public static function initSession() {
        if (!WC()->session) {
            $session = new Zippy_Session_Handler;
            $session->init_session();
        }
    }
}


