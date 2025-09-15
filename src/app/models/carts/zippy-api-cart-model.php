<?php

/**
 * API Args Handler
 *
 * @package Shin
 */

namespace ZIPPY_WASH\Src\App\Models\Carts;

defined('ABSPATH') or die();

use WP_REST_Response;
use ZIPPY_WASH\App\Models\Zippy_Request_Validation;

class Zippy_Api_Cart_Model
{
    public static function get_add_to_cart_args()
    {
        return array(
            'product_id' => array(
                'required' => true,
                'validate_callback' => function($param, $request, $key) {
                    return is_numeric($param) && intval($param) > 0;
                },
                'sanitize_callback' => 'absint',
            ),
                'qty' => array(
                    'required' => false,
                    'default' => 1,
                    'validate_callback' => function($param, $request, $key) {
                        return is_numeric($param) && intval($param) > 0;
                    },
                    'sanitize_callback' => 'absint',
                ),
        );
    }

    public static function get_update_cart_item_args()
    {
      return array(
          'cart_item_key' => array(
              'required' => true,
              'validate_callback' => function($param, $request, $key) {
                  return is_string($param) && !empty($param);
              },
              'sanitize_callback' => 'sanitize_text_field',
          ),
          'qty' => array(
              'required' => true,
              'validate_callback' => function($param, $request, $key) {
                  return is_numeric($param) && intval($param) > 0;
              },
              'sanitize_callback' => 'absint',
          ),
      );
    }

    public static function get_remove_cart_item_args()
    {
      return array(
          'cart_item_key' => array(
              'required' => true,
              'validate_callback' => function($param, $request, $key) {
                  return is_string($param) && !empty($param);
              },
              'sanitize_callback' => 'sanitize_text_field',
          ),
      );
    }
}
