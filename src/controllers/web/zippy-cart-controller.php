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
            $product_id = $request->get_param('product_id');
            $quantity = $request->get_param('qty') ?? 1;
            if (empty($product_id)) {
                return Zippy_Response_Handler::error('Product ID is required.');
            }

            $cart_handler = new Zippy_Cart_Handler();
            $added_items = [];
            $cart_item_key = $cart_handler->add_to_cart($product_id, $quantity);

            if ($cart_item_key) {
                $added_items[] = [
                    'product_id'    => $product_id,
                    'quantity'      => $quantity,
                    'cart_item_key' => $cart_item_key,
                ];
            }

            WC()->cart->calculate_totals();
            WC()->session->save_data();

            if (empty($added_items)) {
                return Zippy_Response_Handler::error('Failed to add products to cart.');
            }

            return Zippy_Response_Handler::success($added_items, 'Products added to cart successfully');

        } catch (\Exception $e) {
            return Zippy_Response_Handler::error($e->getMessage());
        }
    }

    public static function update_quantity_item(WP_REST_Request $request) 
    {
        try {
            $cart_item_key = $request->get_param('cart_item_key');
            $quantity = $request->get_param('qty');
            if (empty($cart_item_key)) {
                return Zippy_Response_Handler::error('Cart item key is required.');
            }

            if (empty($quantity)) {
                return Zippy_Response_Handler::error('Quantity must be at least 1.');
            }

            $cart_handler = new Zippy_Cart_Handler();
            $cart_handler->update_cart_item($cart_item_key, $quantity);
            return Zippy_Response_Handler::success(null, 'Cart item quantity updated successfully');

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

            $cart_handler = new Zippy_Cart_Handler();
            $cart_items = [];
            foreach ( $cart_handler->get_cart_items() as $cart_item_key => $cart_item ) {
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
                    'cart_item_key'   => $cart_item_key,
                ];
            }

            return Zippy_Response_Handler::success($cart_items, 'Fetched cart products successfully');

        } catch (\Exception $e) {
            return Zippy_Response_Handler::error($e->getMessage());
        }
    }

    public static function remove_cart_item(WP_REST_Request $request) 
    {
        try {
            $cart_item_key = $request->get_param('cart_item_key');
            if (empty($cart_item_key)) {
                return Zippy_Response_Handler::error('Cart item key is required.');
            }

            $cart_handler = new Zippy_Cart_Handler();
            $cart_handler->remove_cart_item($cart_item_key);
            return Zippy_Response_Handler::success(null, 'Product removed from cart successfully');

        } catch (\Exception $e) {
            return Zippy_Response_Handler::error($e->getMessage());
        }
    }
}


