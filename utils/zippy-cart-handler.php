<?php

/**
 * Zippy Cart Handler
 *
 * @package Zippy_Booking
 */

namespace Zippy_Wash\Utils;

defined('ABSPATH') || exit;

use WC_Cart;
use WC_Coupon;

class Zippy_Cart_Handler
{
    public function __construct()
    {
  
        if (!WC()->cart) {
            wc_load_cart();
        }
    }

    /**
     * Add product to cart
     *
     * @param int   $product_id
     * @param int   $quantity
     * @param array $custom_data (Optional) Custom data to attach to the cart item
     * @return string|false Cart item key or false on failure
     */
    public function add_to_cart($product_id, $quantity = 1, $custom_data = [])
    {
        if (empty($product_id)) {
            return false;
        }

        // Add product to cart
        $cart_item_key = WC()->cart->add_to_cart($product_id, $quantity, 0, [], $custom_data);

        return $cart_item_key;
    }

    /**
     * Update quantity of an existing cart item
     *
     * @param string $cart_item_key
     * @param int    $new_quantity
     */
    public function update_cart_item($cart_item_key, $new_quantity)
    {
        $items = $this->get_cart_items();
        if (isset($items[$cart_item_key])) {
            WC()->cart->set_quantity($cart_item_key, $new_quantity, true);
            return $cart_item_key;
        }

        return false;
    }

    /**
     * Remove an item from the cart
     *
     * @param string $cart_item_key
     */
    public function remove_cart_item($cart_item_key)
    {
        $items = $this->get_cart_items();
        if (isset($items[$cart_item_key])) {
            WC()->cart->remove_cart_item($cart_item_key);
            return $cart_item_key;
        }

        return false;
    }

    /**
     * Empty the cart
     */
    public function clear_cart()
    {
        WC()->cart->empty_cart();
    }

    /**
     * Get all items in the cart
     *
     * @return array
     */
    public function get_cart_items()
    {
        return WC()->cart->get_cart();
    }

    public function get_cart_totals()
    {
        $this->calculate_totals();
        return WC()->cart->get_totals();
    }

    public function apply_coupon($coupon_code)
    {
        if (empty($coupon_code) || !WC()->cart) {
            return false;
        }

        $applied = WC()->cart->apply_coupon($coupon_code);
        $this->calculate_totals();

        return $applied;
    }

    public function remove_coupon($coupon_code)
    {
        if (empty($coupon_code) || !WC()->cart) {
            return false;
        }

        $this->calculate_totals();
        $removed = WC()->cart->remove_coupon($coupon_code);

        return $removed;
    }

    public function calculate_totals()
    {
        WC()->cart->calculate_totals();
    }

    public function get_applied_coupons()
    {
        return WC()->cart->get_applied_coupons();
    }

    public function get_applied_coupons_info()
    {
        $applied_coupons = $this->get_applied_coupons();
        $coupons_info    = [];

        foreach ($applied_coupons as $code) {
            $coupon = new WC_Coupon($code);
            if ($coupon) {
                $coupons_info[] = [
                    'id'          => $coupon->get_id(),
                    'amount'      => $coupon->get_amount(),
                    'description' => $coupon->get_description(),
                ];
            }
        }

        return $coupons_info;
    }

    public function build_cart_response()
    {
        $cart_info       = $this->get_cart_totals();
        $applied_coupons = $this->get_applied_coupons_info();

        $results                 = [];
        $results['cart_info']    = $cart_info;
        $results['applied_coupons'] = $applied_coupons;

        foreach ($this->get_cart_items() as $cart_item) {
            $product    = $cart_item['data'];
            $product_id = $product->get_id();
            $results['products'][$product_id] = [
                'product_id'    => $product_id,
                'line_subtotal' => $cart_item['line_subtotal'],
                'line_total'    => $cart_item['line_total'],
                'line_discount' => $cart_item['line_subtotal'] - $cart_item['line_total'],
            ];
        }

        return $results;
    }

    public function checkAndRemoveCoupon($code)
    {
        $appliedCoupons = $this->get_applied_coupons();
        if (in_array($code, $appliedCoupons, true)) {
            $this->remove_coupon($code);
        }
    }
}
