<?php

/**
 * API Args Handler
 *
 * @package Shin
 */

namespace ZIPPY_WASH\Src\App\Models\Products;

defined('ABSPATH') or die();

use WP_REST_Response;
use ZIPPY_WASH\App\Models\Zippy_Request_Validation;

class Zippy_Api_Product_Model
{
  public static function get_product_by_category_args()
  {
    return array(
      'category_id' => array(
        'required' => false,
        'validate_callback' => function ($param) {
          return is_numeric($param);
        }
      ),
      'category_slug' => array(
        'required' => false,
        'validate_callback' => function ($param) {
          return is_string($param);
        }
      ),
      'page' => array(
        'required' => false,
        'default' => 1,
        'validate_callback' => function ($param) {
          return is_numeric($param) && $param > 0;
        }
      ),
      'per_page' => array(
        'required' => false,
        'default' => 10,
        'validate_callback' => function ($param) {
          return is_numeric($param) && $param > 0;
        }
      ),
    );
  }
}
