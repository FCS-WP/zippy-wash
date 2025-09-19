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
use WC_Coupon;
use ZIPPY_WASH\Src\Services\Coupons\Zippy_Coupon_Service;
use Zippy_Wash\Utils\Zippy_Cart_Handler;

class Zippy_Coupon_Controller
{
    /**
     * Get WooCommerce products by category
     */
    public static function get_coupons(WP_REST_Request $request)
    {
        $userId = $request->get_param('user_id');
        $args = [
            'post_type'   => 'shop_coupon',
            'post_status' => 'publish',
        ];

        $cart_handler = new Zippy_Cart_Handler();
        $coupons_posts = get_posts($args);
        $results       = [];

        foreach ($coupons_posts as $post) {
            $coupon = new WC_Coupon($post->ID);

            if (!Zippy_Coupon_Service::checkCouponCondition($cart_handler, $coupon, $userId)) {
                $cart_handler->checkAndRemoveCoupon($coupon->get_code());
                continue;
            }

            $results[] = [
                'id'           => $coupon->get_id(),
                'post_excerpt' => $post->post_excerpt,
                'min_amount'   => $coupon->get_minimum_amount(),
                'max_amount'   => $coupon->get_maximum_amount(),
            ];
        }

        return Zippy_Response_Handler::success($results, 'Fetched coupons successfully');
    }

    /**
     * Apply coupon to cart
     */
    public static function apply_coupon_to_cart(WP_REST_Request $request) {
        $id = $request->get_param('id');
        if (empty($id)) {
            return Zippy_Response_Handler::error('Coupon ID is required', 400);
        }

        $coupon = new WC_Coupon($id);
        if (empty($coupon)) {
            return Zippy_Response_Handler::error('Invalid coupon ID', 400);
        }

        $cart_handler = new Zippy_Cart_Handler();
        $applied = $cart_handler->apply_coupon($coupon->get_code());

        if (!$applied) {
            return Zippy_Response_Handler::custom('failure', 'Failed to apply coupon', null, 200);
        }

        return Zippy_Response_Handler::success(
            $cart_handler->build_cart_response(),
            'Coupon applied successfully'
        );
    }

    /**
     * Get cart info with applied coupons
     */
    public static function get_cart_info_applied_coupon(WP_REST_Request $request) {
        $cart_handler = new Zippy_Cart_Handler();

        return Zippy_Response_Handler::success($cart_handler->build_cart_response(), 'Fetched cart info successfully');
    }

    /**
     * Remove coupon from cart
     */
    public static function remove_coupon_from_cart(WP_REST_Request $request) {
        $id = $request->get_param('id');
        if (empty($id)) {
            return Zippy_Response_Handler::error('Coupon ID is required', 400);
        }

        $coupon = new WC_Coupon($id);
        if (empty($coupon)) {
            return Zippy_Response_Handler::error('Invalid coupon ID', 400);
        }

        $cart_handler = new Zippy_Cart_Handler();
        $cart_handler->remove_coupon($coupon->get_code());

        return Zippy_Response_Handler::success($cart_handler->build_cart_response(), 'Coupon removed successfully');
    }
}