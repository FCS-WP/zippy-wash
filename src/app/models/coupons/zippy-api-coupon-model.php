<?php

/**
 * API Args Handler
 *
 * @package Shin
 */

namespace ZIPPY_WASH\Src\App\Models\Coupons;

defined('ABSPATH') or die();

use WP_REST_Response;
use ZIPPY_WASH\App\Models\Zippy_Request_Validation;

class Zippy_Api_Coupon_Model
{
    public static function get_apply_coupons_args()
    {
        return array(
            'id' => array(
                'required' => true,
                'validate_callback' => function ($param) {
                    return is_numeric($param);
                }
            ),
        );
    }

    public static function get_remove_coupons_args()
    {
        return array(
            'id' => array(
                'required' => true,
                'validate_callback' => function ($param) {
                    return is_numeric($param);
                }
            ),
        );
    }

    public static function get_coupons_args()
    {
        return array(
            'user_id' => array(
                'required' => false,
                'validate_callback' => function ($param) {
                    return is_numeric($param);
                }
            ),
        );
    }
}
