import { CreateAttendanceProductDto } from '../../products';
import { CreateAttendanceServiceDto } from '../../services';
import { DISCOUNT_RULES } from '../helpers';
import { AttendanceTotal, ProductCalculation, ServiceCalculation } from '../interfaces';

/**
 * Utility class for calculating discounts and totals for attendance products and services.
 * @class
 * @static
 */
export class DiscountCalculation {
  /**
   * Calculates the total amount including discounts for both products and services
   * @param {CreateAttendanceProductDto[]} products - Array of products to calculate
   * @param {CreateAttendanceServiceDto[]} services - Array of services to calculate
   * @returns {AttendanceTotal} Combined totals for products and services with final total
   */
  static calculateTotal = (
    products: CreateAttendanceProductDto[],
    services: CreateAttendanceServiceDto[]
  ): AttendanceTotal => {
    const productsCalculation = this.calculateProducts(products);
    const servicesCalculation = this.calculateServices(services);

    return {
      ...productsCalculation,
      ...servicesCalculation,
      final_total: productsCalculation.products_final_total + servicesCalculation.services_final_total
    };
  };

  /**
   * Calculates the applicable discount rate based on quantity and optional total
   * @param {number} quantity - Number of items to check for discount
   * @param {number} [total] - Optional total amount to consider for discount
   * @returns {number} Discount rate as a decimal (e.g., 0.1 for 10%)
   */
  static calculateDiscount = (quantity: number, total?: number): number => {
    const applicableDiscount = DISCOUNT_RULES.find(({ condition }) => condition(quantity, total));
    return applicableDiscount?.discount || 0;
  };

  /**
   * Calculates totals and discounts for products
   * @param {CreateAttendanceProductDto[]} products - Array of products to calculate
   * @returns {ProductCalculation} Product calculation details including original total, discount amount, rate and final total
   */
  static calculateProducts = (products: CreateAttendanceProductDto[]): ProductCalculation => {
    const totalProducts = products.reduce((acc, { price }) => acc + price, 0);
    const discount = this.calculateDiscount(products.length);
    const productsDiscount = totalProducts * discount;

    return {
      products_original_total: totalProducts,
      products_discount_amount: productsDiscount,
      products_discount_rate: discount,
      products_final_total: totalProducts - productsDiscount
    };
  };

  /**
   * Calculates totals and discounts for services
   * @param {CreateAttendanceServiceDto[]} services - Array of services to calculate
   * @returns {ServiceCalculation} Service calculation details including original total, discount amount, rate and final total
   */
  static calculateServices = (services: CreateAttendanceServiceDto[]): ServiceCalculation => {
    const totalServices = services.reduce((acc, { price }) => acc + price, 0);
    const discount = this.calculateDiscount(services.length, totalServices);
    const servicesDiscount = totalServices * discount;

    return {
      services_original_total: totalServices,
      services_discount_amount: servicesDiscount,
      services_discount_rate: discount,
      services_final_total: totalServices - servicesDiscount
    };
  };
}
