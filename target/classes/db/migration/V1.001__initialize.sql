CREATE TABLE IF NOT EXISTS p_role(

    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL

);

CREATE TABLE IF NOT EXISTS p_user(

    username VARCHAR PRIMARY KEY,
    password VARCHAR NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    creation_date TIMESTAMP,
    role_id BIGINT,
    CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES p_role(id)

);

CREATE TABLE IF NOT EXISTS s_restaurant(

    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    street VARCHAR NOT NULL,
    building_number VARCHAR NOT NULL,
    post_code VARCHAR NOT NULL,
    province VARCHAR NOT NULL,
    photo VARCHAR NOT NULL,
    owner_id VARCHAR,
    CONSTRAINT fk_owner_id FOREIGN KEY (owner_id) REFERENCES p_user(username)

);

CREATE TABLE IF NOT EXISTS s_restaurant_category(

    code VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    icon VARCHAR

);

CREATE TABLE IF NOT EXISTS p_restaurant_category_association(

    restaurant_id BIGINT,
    category_id VARCHAR,
    PRIMARY KEY (restaurant_id, category_id),
    CONSTRAINT fk_restaurant_id FOREIGN KEY (restaurant_id) REFERENCES s_restaurant(id),
    CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES s_restaurant_category(code)

);


CREATE TABLE IF NOT EXISTS s_product(

    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description VARCHAR,
    price VARCHAR NOT NULL,
    photo VARCHAR,
    restaurant_id BIGINT,
    CONSTRAINT fk_restaurant_id FOREIGN KEY (restaurant_id) REFERENCES s_restaurant(id)

);

CREATE TABLE IF NOT EXISTS s_product_category(

    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL

);

CREATE TABLE IF NOT EXISTS p_product_category_association(

    category_id BIGINT,
    product_id BIGINT,
    PRIMARY KEY (category_id, product_id),
    CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES s_product_category(id),
    CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES s_product(id)

);

