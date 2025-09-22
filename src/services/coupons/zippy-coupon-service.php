<?php
namespace ZIPPY_WASH\Src\Services\Coupons;

defined('ABSPATH') or die();

use ZIPPY_WASH\Utils\Zippy_Cart_Handler;
use WC_Coupon;

class Zippy_Coupon_Service
{
    /**
     * Check if a coupon meets all conditions to be applied
     * - Check Amount
     * - Check Products
     * - Check Categories
     * - Check Usage Limits
     * - Check Usage Per User
     * - Check Email Restrictions
     * @param Zippy_Cart_Handler $cart_handler
     * @param WC_Coupon $coupon
     * @param int|null $userId
     * @return bool
     */
    public static function checkCouponCondition(Zippy_Cart_Handler $cart_handler, WC_Coupon $coupon, ?int $userId = null)
    {
        if (!self::checkAmount($cart_handler, $coupon)) {
            return false;
        }

        if (!self::checkProducts($cart_handler, $coupon)) {
            return false;
        }

        if (!self::checkCategories($cart_handler, $coupon)) {
            return false;
        }

        if (!self::checkUsageLimits($coupon)) {
            return false;
        }

        if (!self::checkUsagePerUser($coupon)) {
            return false;
        }

        if (!self::checkEmailRestrictions($coupon, $userId)) {
            return false;
        }

        return true;
    }

    /**
     * Check min/max amount
     */
    protected static function checkAmount(Zippy_Cart_Handler $cart_handler, WC_Coupon $coupon): bool
    {
        $subtotal = $cart_handler->get_cart_totals()['subtotal'] ?? 0;

        $min = (float) $coupon->get_minimum_amount();
        $max = (float) $coupon->get_maximum_amount();

        if ($min > 0 && $subtotal < $min) return false;
        if ($max > 0 && $subtotal > $max) return false;

        return true;
    }

    /**
     * Check product conditions
     */
    protected static function checkProducts(Zippy_Cart_Handler $cart_handler, WC_Coupon $coupon): bool
    {
        $cart_items = $cart_handler->get_cart_items();
        $cart_ids = array_column($cart_items, 'product_id');

        $include = $coupon->get_product_ids();
        $exclude = $coupon->get_excluded_product_ids();

        if (!empty($include) && !array_intersect($include, $cart_ids)) return false;
        if (!empty($exclude) && array_intersect($exclude, $cart_ids)) return false;

        return true;
    }

    /**
     * Check category conditions
     */
    protected static function checkCategories(Zippy_Cart_Handler $cart_handler, WC_Coupon $coupon): bool
    {
        $cart_items = $cart_handler->get_cart_items();
        $cart_ids = array_column($cart_items, 'product_id');

        $include_cats = $coupon->get_product_categories();
        $exclude_cats = $coupon->get_excluded_product_categories();

        // Check included categories
        if (!empty($include_cats)) {
            $found = false;
            foreach ($cart_ids as $pid) {
                $terms = wp_get_post_terms($pid, 'product_cat', ['fields' => 'ids']);
                if (array_intersect($include_cats, $terms)) {
                    $found = true;
                    break;
                }
            }
            if (!$found) return false;
        }

        // Check excluded categories
        if (!empty($exclude_cats)) {
            foreach ($cart_ids as $pid) {
                $terms = wp_get_post_terms($pid, 'product_cat', ['fields' => 'ids']);
                if (array_intersect($exclude_cats, $terms)) return false;
            }
        }

        return true;
    }

    /**
     * Check usage limits
     */
    protected static function checkUsageLimits(WC_Coupon $coupon): bool
    {
        if ($coupon->get_usage_limit() > 0 && $coupon->get_usage_count() >= $coupon->get_usage_limit()) {
            return false;
        }
        return true;
    }

    /**
     * Check usage limit per user
     */
    protected static function checkUsagePerUser(WC_Coupon $coupon): bool
    {
        if ($coupon->get_usage_limit_per_user() > 0) {
            $user_id = get_current_user_id();
            if ($user_id) {
                $used = wc_get_customer_total_spent_on_coupon($user_id, $coupon->get_code());
                if ($used >= $coupon->get_usage_limit_per_user()) return false;
            }
        }
        return true;
    }

    /**
     * Check email restrictions
     */
    protected static function checkEmailRestrictions(WC_Coupon $coupon, ?int $userId = null): bool
    {
        $emails = $coupon->get_email_restrictions();
        if (empty($emails)) return true;

        if ($userId) {
            $user_info = get_userdata($userId);
            if ($user_info && in_array($user_info->user_email, $emails)) return true;
        }

        return false;
    }
}
