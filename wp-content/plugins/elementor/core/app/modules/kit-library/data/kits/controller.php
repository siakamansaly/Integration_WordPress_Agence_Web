<?php
namespace Elementor\Core\App\Modules\KitLibrary\Data\Kits;

use Elementor\Core\App\Modules\KitLibrary\Data\Base_Controller;
use Elementor\Core\App\Modules\KitLibrary\Data\Exceptions\Wp_Error_Exception;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Controller extends Base_Controller {

	/**
	 * @param \WP_REST_Request $request
	 *
	 * @return \WP_Error|array
	 */
	public function get_items( $request ) {
		try {
			$data = $this->get_repository()->get_all( $request->get_param( 'force' ) );
		} catch ( Wp_Error_Exception $exception ) {
			return new \WP_Error( $exception->getCode(), $exception->getMessage(), [ 'status' => $exception->getCode() ] );
		} catch ( \Exception $exception ) {
			return new \WP_Error( 'server_error', __( 'Something went wrong.', 'elementor' ), [ 'status' => 500 ] );
		}

		return [
			'data' => $data->values(),
		];
	}

	/**
	 * @param \WP_REST_Request $request
	 *
	 * @return \WP_Error|array
	 */
	public function get_item( $request ) {
		try {
			$data = $this->get_repository()->find( $request->get_param( 'id' ) );
		} catch ( Wp_Error_Exception $exception ) {
			return new \WP_Error( $exception->getCode(), $exception->getMessage(), [ 'status' => $exception->getCode() ] );
		} catch ( \Exception $exception ) {
			return new \WP_Error( 'server_error', __( 'Something went wrong.', 'elementor' ), [ 'status' => 500 ] );
		}

		if ( ! $data ) {
			return new \WP_Error( 'kit_not_exists', __( 'Kit not exists.', 'elementor' ), [ 'status' => 404 ] );
		}

		return [
			'data' => $data,
		];
	}

	/**
	 * @return string
	 */
	public function get_name() {
		return 'kits';
	}

	/**
	 * Must implement.
	 */
	public function register_endpoints() {
		$this->register_endpoint( Endpoints\Download_Link::class );
		$this->register_endpoint( Endpoints\Favorites::class );
	}

	/**
	 * Register internal endpoint.
	 */
	protected function register_internal_endpoints() {
		// Register as internal to remove the default endpoint generated by the base controller.
		$this->register_endpoint( Endpoints\Index::class );
	}
}
