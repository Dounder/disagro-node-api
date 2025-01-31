export interface ProductCalculation {
  products_original_total: number;
  products_discount_amount: number;
  products_discount_rate: number;
  products_final_total: number;
}

export interface ServiceCalculation {
  services_original_total: number;
  services_discount_amount: number;
  services_discount_rate: number;
  services_final_total: number;
}

export interface AttendanceTotal extends ProductCalculation, ServiceCalculation {
  final_total: number;
}
