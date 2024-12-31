INSERT INTO p_role (id, name)
VALUES
(1, 'User'),
(2, 'Admin');

INSERT INTO p_user (username, password, first_name, last_name, creation_date, role_id)
VALUES
('username1', '$2a$12$3ENxp3f4AVP7z0V3fsl5DOL5ZFVDj53Poei8EAVR2f93Z9xyfjwF2', 'John', 'Doe', CURRENT_TIMESTAMP, 1),
('username2', '$2a$12$3ENxp3f4AVP7z0V3fsl5DOL5ZFVDj53Poei8EAVR2f93Z9xyfjwF2', 'Jane', 'Smith', CURRENT_TIMESTAMP, 1),
('admin1', '$2a$12$3ENxp3f4AVP7z0V3fsl5DOL5ZFVDj53Poei8EAVR2f93Z9xyfjwF2', 'Admin', 'One', CURRENT_TIMESTAMP, 2),
('admin2', '$2a$12$3ENxp3f4AVP7z0V3fsl5DOL5ZFVDj53Poei8EAVR2f93Z9xyfjwF2', 'Admin', 'Two', CURRENT_TIMESTAMP, 2),
('username3', '$2a$12$3ENxp3f4AVP7z0V3fsl5DOL5ZFVDj53Poei8EAVR2f93Z9xyfjwF2', 'Tom', 'Johnson', CURRENT_TIMESTAMP, 1),
('username4', '$2a$12$3ENxp3f4AVP7z0V3fsl5DOL5ZFVDj53Poei8EAVR2f93Z9xyfjwF2', 'Emily', 'Davis', CURRENT_TIMESTAMP, 1),
('admin3', '$2a$12$3ENxp3f4AVP7z0V3fsl5DOL5ZFVDj53Poei8EAVR2f93Z9xyfjwF2', 'Admin', 'Three', CURRENT_TIMESTAMP, 2),
('username5', '$2a$12$3ENxp3f4AVP7z0V3fsl5DOL5ZFVDj53Poei8EAVR2f93Z9xyfjwF2', 'Sam', 'Brown', CURRENT_TIMESTAMP, 1),
('username6', '$2a$12$3ENxp3f4AVP7z0V3fsl5DOL5ZFVDj53Poei8EAVR2f93Z9xyfjwF2', 'Lily', 'White', CURRENT_TIMESTAMP, 1),
('username7', '$2a$12$3ENxp3f4AVP7z0V3fsl5DOL5ZFVDj53Poei8EAVR2f93Z9xyfjwF2', 'Lily', 'White', CURRENT_TIMESTAMP, 1),
('username8', '$2a$12$3ENxp3f4AVP7z0V3fsl5DOL5ZFVDj53Poei8EAVR2f93Z9xyfjwF2', 'Lily', 'White', CURRENT_TIMESTAMP, 1),
('username9', '$2a$12$3ENxp3f4AVP7z0V3fsl5DOL5ZFVDj53Poei8EAVR2f93Z9xyfjwF2', 'Lily', 'White', CURRENT_TIMESTAMP, 1),
('username10', '$2a$12$3ENxp3f4AVP7z0V3fsl5DOL5ZFVDj53Poei8EAVR2f93Z9xyfjwF2', 'Lily', 'White', CURRENT_TIMESTAMP, 1),
('username11', '$2a$12$3ENxp3f4AVP7z0V3fsl5DOL5ZFVDj53Poei8EAVR2f93Z9xyfjwF2', 'Lily', 'White', CURRENT_TIMESTAMP, 1),
('username12', '$2a$12$3ENxp3f4AVP7z0V3fsl5DOL5ZFVDj53Poei8EAVR2f93Z9xyfjwF2', 'Lily', 'White', CURRENT_TIMESTAMP, 1),
('username13', '$2a$12$3ENxp3f4AVP7z0V3fsl5DOL5ZFVDj53Poei8EAVR2f93Z9xyfjwF2', 'Lily', 'White', CURRENT_TIMESTAMP, 1),
('username14', '$2a$12$3ENxp3f4AVP7z0V3fsl5DOL5ZFVDj53Poei8EAVR2f93Z9xyfjwF2', 'Lily', 'White', CURRENT_TIMESTAMP, 1),
('admin4', '$2a$12$3ENxp3f4AVP7z0V3fsl5DOL5ZFVDj53Poei8EAVR2f93Z9xyfjwF2', 'Admin', 'Four', CURRENT_TIMESTAMP, 2);

INSERT INTO s_restaurant (id, name, city, street, building_number, post_code, province, photo, owner_id)
VALUES
(1, 'Trattoria del Gusto', 'Warszawa', 'Nowy Świat', '123', '00-456', 'Mazowieckie', 'trattoria_photo.jpg', 'username1'),
(2, 'Thai Spice', 'Kraków', 'Rynek Główny', '45', '30-062', 'Małopolskie', 'thai_spice_photo.jpg', 'username2'),
(3, 'Sakura Sushi', 'Gdańsk', 'Długa', '67', '80-831', 'Pomorskie', 'sakura_sushi_photo.jpg', 'username3'),
(4, 'Spice of India', 'Warszawa', 'Marszałkowska', '89', '02-678', 'Mazowieckie', 'spice_of_india_photo.jpg', 'username4'),
(5, 'Mexican Fiesta', 'Kraków', 'Sławkowska', '34', '31-014', 'Małopolskie', 'mexican_fiesta_photo.jpg', 'username5'),
(6, 'Olive Garden', 'Gdynia', 'Kościuszki', '56', '81-745', 'Pomorskie', 'olive_garden_photo.jpg', 'username6'),
(7, 'Sushi Master', 'Poznań', 'Święty Marcin', '78', '61-804', 'Wielkopolskie', 'sushi_master_photo.jpg', 'username3'),
(8, 'Green Eats', 'Wrocław', 'Kazimierza Wielkiego', '12', '50-077', 'Dolnośląskie', 'green_eats_photo.jpg', 'username2'),
(9, 'Burger Heaven', 'Łódź', 'Piotrkowska', '23', '90-001', 'Łódzkie', 'burger_heaven_photo.jpg', 'username1'),
(10, 'Pizza Palace', 'Katowice', 'Mariacka', '56', '40-014', 'Śląskie', 'pizza_palace_photo.jpg', 'username4'),
(11, 'Pasta Paradise', 'Kraków', 'ul. Szewska', '67', '31-009', 'Małopolskie', 'pasta_paradise_photo.jpg', 'username11'),
(12, 'Tom Yum Express', 'Warszawa', 'Chmielna', '45', '00-021', 'Mazowieckie', 'tom_yum_express_photo.jpg', 'username12'),
(13, 'Tokyo Bites', 'Poznań', 'Żydowska', '23', '61-766', 'Wielkopolskie', 'tokyo_bites_photo.jpg', 'username13'),
(14, 'Curry Kingdom', 'Wrocław', 'Świdnicka', '89', '50-069', 'Dolnośląskie', 'curry_kingdom_photo.jpg', 'username14'),
(15, 'Taco Haven', 'Gdańsk', 'ul. Długa', '34', '80-001', 'Pomorskie', 'taco_haven_photo.jpg', 'username7'),
(16, 'Oregano Fresh', 'Łódź', 'Narutowicza', '56', '90-102', 'Łódzkie', 'oregano_fresh_photo.jpg', 'username6'),
(17, 'Greek Delight', 'Katowice', '3 Maja', '78', '40-001', 'Śląskie', 'greek_delight_photo.jpg', 'username4'),
(18, 'Sashimi Sensation', 'Kraków', 'ul. Floriańska', '12', '31-021', 'Małopolskie', 'sashimi_sensation_photo.jpg', 'username3'),
(19, 'Healthy Bites', 'Poznań', 'Rynek Jeżycki', '56', '61-080', 'Wielkopolskie', 'healthy_bites_photo.jpg', 'username1'),
(20, 'BBQ Bliss', 'Wrocław', 'Kiełbaśnicza', '23', '50-111', 'Dolnośląskie', 'bbq_bliss_photo.jpg', 'username2');


INSERT INTO s_restaurant_category (code, name, icon)
VALUES
('b4c54009-4983-4d47-a594-61b0c113e2ac', 'Włoskie', '🍕🍝'),
('84a9b19c-3cfb-4461-a20f-dcf2cb5db164', 'Tajskie', '🥢🥠'),
('6a75e4d9-02a7-48a0-b387-109ff69a352a', 'Japońska', '🍣🍱'),
('f6a6b2f3-8bb9-4ba7-8ea1-1a17bf1a1f55', 'Indyjskie', '🍛🍲'),
('de09e6d2-27b0-4c1d-8250-18c3785f10a8', 'Meksykańskie', '🌮🌶️'),
('8278a3e1-e963-4dab-8f50-8dd9c0535f39', 'Greckie', '🥗🍢'),
('c04e39e3-5f97-40f9-a16d-ea29571c41a7', 'Sushi', '🍜🍤'),
('e13608f9-44c2-4a78-ba25-9f0a42328a1d', 'Zdrowe', '🌽🥦'),
('fae1e6f1-9d6b-429f-91e9-097d6d96168f', 'Burgery', '🦐🐟'),
('d05e6e60-8854-4c08-ba4f-4cc2e7f9405a', 'Pizza', '🥩🔥');

INSERT INTO p_restaurant_category_association (restaurant_id, category_id)
VALUES
(1, 'b4c54009-4983-4d47-a594-61b0c113e2ac'),
(2, '84a9b19c-3cfb-4461-a20f-dcf2cb5db164'),
(3, 'c04e39e3-5f97-40f9-a16d-ea29571c41a7'),
(4, 'f6a6b2f3-8bb9-4ba7-8ea1-1a17bf1a1f55'),
(5, 'de09e6d2-27b0-4c1d-8250-18c3785f10a8'),
(6, '8278a3e1-e963-4dab-8f50-8dd9c0535f39'),
(7, 'c04e39e3-5f97-40f9-a16d-ea29571c41a7'),
(8, 'e13608f9-44c2-4a78-ba25-9f0a42328a1d'),
(9, 'fae1e6f1-9d6b-429f-91e9-097d6d96168f'),
(10, 'd05e6e60-8854-4c08-ba4f-4cc2e7f9405a'),
(11, 'b4c54009-4983-4d47-a594-61b0c113e2ac'),
(12, '84a9b19c-3cfb-4461-a20f-dcf2cb5db164'),
(13, 'c04e39e3-5f97-40f9-a16d-ea29571c41a7'),
(14, 'f6a6b2f3-8bb9-4ba7-8ea1-1a17bf1a1f55'),
(15, 'de09e6d2-27b0-4c1d-8250-18c3785f10a8'),
(16, '8278a3e1-e963-4dab-8f50-8dd9c0535f39'),
(17, 'c04e39e3-5f97-40f9-a16d-ea29571c41a7'),
(18, 'c04e39e3-5f97-40f9-a16d-ea29571c41a7'),
(19, 'e13608f9-44c2-4a78-ba25-9f0a42328a1d'),
(20, 'fae1e6f1-9d6b-429f-91e9-097d6d96168f');

INSERT INTO s_product (id, name, description, price, photo, restaurant_id)
VALUES
(1, 'Margherita', 'Klasyczna pizza z pomidorem i mozzarellą', '25.00', 'margherita_photo.jpg', 1),
(2, 'Spaghetti Bolognese', 'Makaron z sosem mięsnym', '30.00', 'bolognese_photo.jpg', 1),
(3, 'Tiramisu', 'Deser z kawą i mascarpone', '15.00', 'tiramisu_photo.jpg', 1),
(4, 'Ravioli ze szpinakiem', 'Pierogi z nadzieniem ze szpinaku', '35.00', 'ravioli_photo.jpg', 1),
(5, 'Caprese Salad', 'Sałatka z pomidorów, mozzarelli i bazylii', '18.00', 'caprese_photo.jpg', 1),
(6, 'Pad Thai', 'Smażony makaron z krewetkami i warzywami', '28.00', 'pad_thai_photo.jpg', 2),
(7, 'Green Curry', 'Zielone curry z kurczakiem', '32.00', 'green_curry_photo.jpg', 2),
(8, 'Mango Sticky Rice', 'Ryż z mango i kokosem', '20.00', 'mango_sticky_rice_photo.jpg', 2),
(9, 'Tom Yum Soup', 'Pikantna zupa z krewetkami', '25.00', 'tom_yum_soup_photo.jpg', 2),
(10, 'Spring Rolls', 'Ruloniki wiosenne z kurczakiem', '15.00', 'spring_rolls_photo.jpg', 2),
(11, 'Sushi Mix', 'Mieszanka różnych rodzajów sushi', '40.00', 'sushi_mix_photo.jpg', 3),
(12, 'Tempura Roll', 'Rolka z tempurą i łososiem', '35.00', 'tempura_roll_photo.jpg', 3),
(13, 'Miso Soup', 'Zupa miso z wodorostami i tofu', '18.00', 'miso_soup_photo.jpg', 3),
(14, 'Edamame', 'Gotowane strączki sojowe', '10.00', 'edamame_photo.jpg', 3),
(15, 'Dragon Roll', 'Rolka z krewetką, awokado i eel', '45.00', 'dragon_roll_photo.jpg', 3),
(16, 'Chicken Tikka Masala', 'Kurczak w sosie masala', '35.00', 'chicken_tikka_masala_photo.jpg', 4),
(17, 'Saag Paneer', 'Ser paneer w sosie szpinakowym', '30.00', 'saag_paneer_photo.jpg', 4),
(18, 'Naan Bread', 'Chleb naan z czosnkiem', '12.00', 'naan_bread_photo.jpg', 4),
(19, 'Biryani', 'Ryż z warzywami i mięsem', '40.00', 'biryani_photo.jpg', 4),
(20, 'Mango Lassi', 'Napój mleczny z mango', '8.00', 'mango_lassi_photo.jpg', 4),
(21, 'Burrito Bowl', 'Miska z burrito, ryżem i warzywami', '30.00', 'burrito_bowl_photo.jpg', 5),
(22, 'Quesadillas', 'Tortilla z serem i mięsem', '25.00', 'quesadillas_photo.jpg', 5),
(23, 'Guacamole', 'Pasta z awokado i pomidorów', '15.00', 'guacamole_photo.jpg', 5),
(24, 'Tacos', 'Tortille z mięsem, sosem i warzywami', '18.00', 'tacos_photo.jpg', 5),
(25, 'Churros', 'Ciasteczka smażone w głębokim oleju', '10.00', 'churros_photo.jpg', 5),
(26, 'Pasta Alfredo', 'Makaron w sosie śmietanowym', '35.00', 'pasta_alfredo_photo.jpg', 6),
(27, 'Minestrone Soup', 'Warzywna zupa minestrone', '18.00', 'minestrone_soup_photo.jpg', 6),
(28, 'Chicken Parmesan', 'Kurczak zapiekany z parmezanem', '40.00', 'chicken_parmesan_photo.jpg', 6),
(29, 'Tiramisu', 'Klasyczne włoskie tiramisu', '20.00', 'tiramisu_photo.jpg', 6),
(30, 'Breadsticks', 'Paluchy chlebowe z czosnkiem', '12.00', 'breadsticks_photo.jpg', 6),
(31, 'Sashimi Platter', 'Platerek z kawałkami surowej ryby', '50.00', 'sashimi_platter_photo.jpg', 7),
(32, 'Rainbow Roll', 'Rolka z różnokolorowymi składnikami', '40.00', 'rainbow_roll_photo.jpg', 7),
(33, 'Uramaki Combo', 'Kombinacja różnych rodzajów uramaki', '45.00', 'uramaki_combo_photo.jpg', 7),
(34, 'Miso Ramen', 'Ramen w zupie miso', '25.00', 'miso_ramen_photo.jpg', 7),
(35, 'Ebi Nigiri', 'Nigiri z krewetką', '15.00', 'ebi_nigiri_photo.jpg', 7),
(36, 'Quinoa Salad', 'Sałatka z quinoa, warzywami i fetą', '25.00', 'quinoa_salad_photo.jpg', 8),
(37, 'Vegan Burger', 'Wegański burger z soczewicą', '20.00', 'vegan_burger_photo.jpg', 8),
(38, 'Avocado Toast', 'Chleb z awokado i jajkiem', '15.00', 'avocado_toast_photo.jpg', 8),
(39, 'Smoothie Bowl', 'Miska ze smoothie i owocami', '18.00', 'smoothie_bowl_photo.jpg', 8),
(40, 'Sweet Potato Fries', 'Słodkie frytki z batata', '12.00', 'sweet_potato_fries_photo.jpg', 8),
(41, 'Classic Cheeseburger', 'Klasyczny cheeseburger z wołowiną', '22.00', 'classic_cheeseburger_photo.jpg', 9),
(42, 'BBQ Bacon Burger', 'Burger z boczkiem i sosem BBQ', '25.00', 'bbq_bacon_burger_photo.jpg', 9),
(43, 'Veggie Burger', 'Burger wegański z warzywami', '20.00', 'veggie_burger_photo.jpg', 9),
(44, 'Onion Rings', 'Kołaczki cebulowe w chrupiącej panierce', '10.00', 'onion_rings_photo.jpg', 9),
(45, 'Sweet Potato Burger', 'Burger z batata i czarną fasolą', '23.00', 'sweet_potato_burger_photo.jpg', 9),
(46, 'Margherita Pizza', 'Pizza z sosem pomidorowym i mozzarellą', '30.00', 'margherita_pizza_photo.jpg', 10),
(47, 'Pepperoni Pizza', 'Pizza z pikantnymi plasterkami pepperoni', '35.00', 'pepperoni_pizza_photo.jpg', 10),
(48, 'Capricciosa Pizza', 'Pizza z szynką, pieczarkami i karczochami', '40.00', 'capricciosa_pizza_photo.jpg', 10),
(49, 'Calzone', 'Zamknięta pizza z farszem', '32.00', 'calzone_photo.jpg', 10),
(50, 'Garlic Knots', 'Węzły czosnkowe z pieca', '15.00', 'garlic_knots_photo.jpg', 10);

INSERT INTO s_product_category (id, name, restaurant_id)
VALUES
(1, 'Pizze', 1),
(2, 'Makarony', 1),
(3, 'Desery', 1),
(4, 'Japońskie', 3),
(5, 'Indyjskie', 4),
(6, 'Meksykańskie', 5),
(7, 'Sałatki', 6),
(8, 'Wegetariańskie', 8),
(9, 'Burgery', 9),
(10, 'Przekąski', 10),
(11, 'Ryby i Owoce Morza', 10),
(12, 'Włoskie', 11),
(13, 'Tajskie', 12),
(14, 'Sushi', 13),
(15, 'Zdrowe', 14),
(16, 'Kurczak i Mięsa Białe', 15),
(17, 'Greckie', 16),
(18, 'Chińskie', 17),
(19, 'Kawa i Herbaty', 18),
(20, 'Napoje Bezalkoholowe', 20),
(21, 'Różności', 2);

INSERT INTO p_product_category_association (category_id, product_id)
VALUES
(1, 1),
(1, 6),
(1, 11),
(2, 2),
(2, 7),
(2, 12),
(3, 3),
(3, 8),
(3, 13),
(4, 4),
(4, 9),
(4, 14),
(5, 5),
(5, 10),
(5, 15),
(6, 16),
(6, 21),
(6, 26),
(7, 17),
(7, 22),
(7, 27),
(8, 18),
(8, 23),
(8, 28),
(21, 6);



SELECT pg_catalog.setval('s_product_id_seq', 50, true);
SELECT pg_catalog.setval('s_product_category_id_seq', 21, true);
SELECT pg_catalog.setval('s_restaurant_id_seq', 20, true);
SELECT pg_catalog.setval('p_role_id_seq', 2, true);