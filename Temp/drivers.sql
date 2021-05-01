create table drivers (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	user_id INT NOT NULL,
	car_color VARCHAR(50) NOT NULL,
	car_model VARCHAR(50) NOT NULL,
	car_number VARCHAR(50) NOT NULL,
	is_avaliable VARCHAR(50) NOT NULL,
	request_id INT,
	rating DECIMAL(3,2)
);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (19, 'Goldenrod', '7 Series', 'CE0453WD', true, 58, 4.08);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (46, 'Fuscia', 'Club Wagon', 'CE3550QK', true, 20, 4.11);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (6, 'Teal', 'SJ', 'CE8335EX', true, 94, 3.64);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (10, 'Goldenrod', 'S4', 'CE7987JO', true, 39, 3.63);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (53, 'Maroon', 'Cougar', 'CE2886YL', true, 99, 3.12);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (34, 'Khaki', '300C', 'CE6813OJ', true, 75, 4.33);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (15, 'Crimson', 'Suburban 2500', 'CE1062WY', true, 43, 3.18);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (29, 'Fuscia', 'Pajero', 'CE7628PR', true, 42, 3.16);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (81, 'Yellow', 'Altima', 'CE1615HX', true, 59, 4.71);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (68, 'Mauv', 'Lightning', 'CE3500WE', true, 20, 4.28);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (92, 'Yellow', 'Reatta', 'CE0180VI', true, 30, 3.42);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (60, 'Fuscia', 'XLR', 'CE7183NX', true, 5, 4.84);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (40, 'Teal', 'Mazdaspeed 3', 'CE4710AD', true, 24, 3.42);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (49, 'Blue', 'Edge', 'CE1980UE', true, 13, 3.73);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (42, 'Maroon', 'LX', 'CE0739JB', true, 98, 4.94);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (6, 'Aquamarine', '350Z', 'CE8677WB', true, 2, 3.34);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (82, 'Mauv', 'Quest', 'CE0959XW', true, 34, 3.36);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (96, 'Khaki', 'H2', 'CE2935MG', true, 47, 4.33);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (47, 'Khaki', 'S70', 'CE3993SV', true, 60, 3.5);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (21, 'Maroon', 'Ram Van 1500', 'CE3057XQ', true, 39, 3.04);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (67, 'Green', 'XF', 'CE8983OA', true, 94, 4.72);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (33, 'Teal', 'Esteem', 'CE0708KV', true, 11, 3.42);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (77, 'Aquamarine', 'Escalade', 'CE9827PW', true, 17, 3.82);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (24, 'Maroon', 'Murciélago', 'CE3755NN', true, 46, 4.57);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (4, 'Mauv', 'H2 SUT', 'CE9866MD', true, 79, 3.07);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (60, 'Maroon', 'Legacy', 'CE3499RJ', true, 40, 4.79);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (2, 'Maroon', 'Windstar', 'CE7692CE', true, 56, 4.24);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (77, 'Indigo', 'Paseo', 'CE6361MK', true, 26, 4.53);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (86, 'Puce', 'XJ Series', 'CE2334IW', true, 77, 4.26);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (89, 'Puce', 'Solstice', 'CE1151EV', true, 57, 4.24);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (88, 'Red', 'Ranger', 'CE1814MY', true, 29, 3.53);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (55, 'Puce', 'CTS-V', 'CE0656EJ', true, 51, 4.18);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (26, 'Maroon', 'Escape', 'CE4589ED', true, 70, 3.04);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (3, 'Blue', 'Tundra', 'CE7436BY', true, 82, 3.69);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (82, 'Mauv', 'Grand Prix', 'CE4044TY', true, 70, 4.6);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (83, 'Green', 'Savana 1500', 'CE5821OA', true, 57, 4.37);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (24, 'Green', 'Caprice Classic', 'CE5657VH', true, 36, 3.01);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (19, 'Khaki', 'Scirocco', 'CE2522RP', true, 95, 3.82);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (6, 'Yellow', 'Explorer', 'CE7930IP', true, 92, 4.26);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (23, 'Purple', 'Escape', 'CE2157DF', true, 90, 3.65);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (69, 'Blue', 'Sebring', 'CE2471JP', true, 48, 4.71);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (52, 'Crimson', 'E150', 'CE8310QA', true, 2, 4.34);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (49, 'Blue', 'MX-5', 'CE4131XL', true, 19, 3.65);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (73, 'Indigo', 'Maxima', 'CE8333VY', true, 83, 3.34);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (77, 'Goldenrod', 'Sunfire', 'CE1959CT', true, 19, 4.48);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (17, 'Red', '300SE', 'CE5107CO', true, 39, 3.6);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (77, 'Green', 'Impala', 'CE2960UA', true, 39, 3.14);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (20, 'Turquoise', 'Eldorado', 'CE1501SF', true, 55, 4.9);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (30, 'Red', '900', 'CE9003NQ', true, 86, 3.78);
insert into drivers (user_id, car_color, car_model, car_number, is_avaliable, request_id, rating) values (80, 'Goldenrod', 'Prius', 'CE0956CU', true, 80, 3.59);
