CREATE SEQUENCE IF NOT EXISTS basket_id_seq START WITH 1;
CREATE SEQUENCE IF NOT EXISTS basket_items_id_seq START WITH 1;

CREATE TABLE IF NOT EXISTS p_basket
(
    id        BIGSERIAL primary key,
    uuid      VARCHAR(255) NOT NULL,
    username  VARCHAR,
    CONSTRAINT fk_username FOREIGN KEY (username) REFERENCES p_user(username)
);

CREATE TABLE IF NOT EXISTS s_basket_item
(
    id        BIGSERIAL primary key,
    product_id BIGINT NOT NULL,
    basket_id  BIGINT,
    quantity   INT NOT NULL DEFAULT 1,
    CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES s_product(id),
    CONSTRAINT fk_basket_id  FOREIGN KEY (basket_id) REFERENCES p_basket(id)
);
