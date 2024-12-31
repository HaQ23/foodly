ALTER TABLE s_product_category
    ADD COLUMN restaurant_id BIGINT,
    ADD CONSTRAINT fk_restaurant_id FOREIGN KEY (restaurant_id) REFERENCES s_restaurant(id)