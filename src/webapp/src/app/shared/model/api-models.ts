/* tslint:disable */
/* eslint-disable */

export interface ProductCategoryDto {
    id?: number;
    name?: string;
    restaurantId?: number;
}

export interface ProductDto {
    categories?: ProductCategoryDto[];
    description?: string;
    id?: number;
    name?: string;
    photo?: string;
    price?: string;
    restaurantId?: number;
}

export interface RestaurantCategoryDto {
    code?: string;
    icon?: string;
    name?: string;
}

export interface RestaurantDto {
    buildingNumber?: string;
    categories?: RestaurantCategoryDto[];
    city?: string;
    id?: number;
    name?: string;
    photo?: string;
    postCode?: string;
    province?: string;
    street?: string;
}
