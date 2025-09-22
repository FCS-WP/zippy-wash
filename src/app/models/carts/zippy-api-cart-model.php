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

    public static function get_add_products_to_cart_args()
    {
        return array(
            'products' => array(
                'required' => true,
                'validate_callback' => function($param, $request, $key) {
                    if (!is_array($param) || empty($param)) {
                        return false;
                    }
                    foreach ($param as $product) {
                        if (!isset($product['product_id']) || !is_numeric($product['product_id']) || intval($product['product_id']) <= 0) {
                            return false;
                        }
                        if (isset($product['qty']) && (!is_numeric($product['qty']) || intval($product['qty']) <= 0)) {
                            return false;
                        }
                    }
                    return true;
                },
                'sanitize_callback' => function($param, $request, $key) {
                    $sanitized = array();
                    foreach ($param as $product) {
                        $sanitized_product = array();
                        $sanitized_product['product_id'] = isset($product['product_id']) ? absint($product['product_id']) : 0;
                        $sanitized_product['qty'] = isset($product['qty']) ? absint($product['qty']) : 1;
                        $sanitized[] = $sanitized_product;
                    }
                    return $sanitized;
                },
            ),
        );
    }
}
