create table requests (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	customer_id INT NOT NULL,
	driver_id INT NOT NULL,
	created_date DATE NOT NULL,
	last_update DATE,
	destination_location VARCHAR(150) NOT NULL,
	passanger_location VARCHAR(150) NOT NULL,
	price VARCHAR(50) NOT NULL,
	car_type VARCHAR(7) NOT NULL,
	status VARCHAR(10) NOT NULL,
	description TEXT
);
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (48, 43, '2021-04-30', '2021-05-01', '824 Transport Parkway', '81911 John Wall Parkway', '$28.31', 'Lux', 'Active', 'sodales sed');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (4, 2, '2021-04-30', '2021-05-01', '8558 Browning Terrace', '5274 Ridgeview Crossing', '$23.89', 'Lux', 'Canceled', 'felis sed');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (19, 4, '2021-04-30', '2021-05-01', '9 Welch Center', '730 Fordem Pass', '$13.39', 'Comfort', 'Postponed', 'neque vestibulum eget');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (78, 10, '2021-04-30', '2021-05-01', '03 Buhler Park', '9857 Fairview Crossing', '$7.74', 'Comfort', 'Active', 'nulla ut erat id');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (27, 7, '2021-04-30', '2021-05-01', '76043 Sauthoff Junction', '8 Bashford Park', '$22.04', 'Comfort', 'Postponed', 'nullam molestie');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (45, 43, '2021-04-30', '2021-05-01', '4 Ronald Regan Way', '5348 Gale Way', '$13.63', 'Green', 'Accepted', 'ligula nec');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (85, 77, '2021-04-30', '2021-05-01', '53 Bobwhite Hill', '49583 1st Way', '$10.87', 'Comfort', 'Accepted', 'in consequat ut nulla');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (60, 53, '2021-04-30', '2021-05-01', '3 Ridge Oak Street', '53915 Surrey Pass', '$2.94', 'Green', 'Done', 'donec posuere metus vitae');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (37, 92, '2021-04-30', '2021-05-01', '050 Crest Line Pass', '73 Colorado Crossing', '$7.88', 'Basic', 'Active', 'at nibh in');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (44, 100, '2021-04-30', '2021-05-01', '307 Clarendon Park', '96 Westridge Hill', '$11.29', 'Xl', 'Accepted', 'orci luctus et ultrices');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (29, 79, '2021-04-30', '2021-05-01', '6398 Pepper Wood Crossing', '4187 Arapahoe Place', '$26.99', 'Lux', 'Active', 'lacinia erat vestibulum');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (74, 13, '2021-04-30', '2021-05-01', '0 Jenifer Lane', '296 Northfield Court', '$27.19', 'Green', 'Active', 'integer aliquet massa id');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (75, 69, '2021-04-30', '2021-05-01', '652 Bobwhite Court', '698 Glendale Plaza', '$15.16', 'Lux', 'Done', 'quis lectus suspendisse');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (46, 56, '2021-04-30', '2021-05-01', '418 Main Road', '428 Maryland Place', '$7.10', 'Lux', 'Done', 'cras mi');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (95, 56, '2021-04-30', '2021-05-01', '444 Mallard Plaza', '10381 Mariners Cove Plaza', '$5.04', 'Basic', 'Accepted', 'nunc viverra dapibus');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (42, 86, '2021-04-30', '2021-05-01', '87 Amoth Hill', '14668 Merrick Terrace', '$13.93', 'Xl', 'Done', 'semper sapien a libero nam');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (73, 42, '2021-04-30', '2021-05-01', '9264 Tomscot Drive', '8 Tomscot Plaza', '$2.29', 'Lux', 'InProgress', 'at nibh in hac');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (19, 71, '2021-04-30', '2021-05-01', '71 Dryden Terrace', '939 Havey Point', '$28.54', 'Basic', 'Postponed', 'luctus et ultrices posuere cubilia');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (62, 87, '2021-04-30', '2021-05-01', '50 Rigney Road', '5 Marcy Parkway', '$16.31', 'Basic', 'Done', 'ac neque duis');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (52, 21, '2021-04-30', '2021-05-01', '332 Esch Crossing', '1 Nova Hill', '$25.69', 'Comfort', 'Canceled', 'integer ac neque duis');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (8, 40, '2021-04-30', '2021-05-01', '6 Maryland Road', '7706 Truax Circle', '$17.05', 'Comfort', 'InProgress', 'odio curabitur');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (46, 62, '2021-04-30', '2021-05-01', '18 Morningstar Court', '12 Toban Lane', '$11.82', 'Comfort', 'Accepted', 'commodo vulputate');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (64, 94, '2021-04-30', '2021-05-01', '2614 Mosinee Hill', '5817 Thompson Plaza', '$9.76', 'Comfort', 'InProgress', 'mollis molestie lorem quisque');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (76, 6, '2021-04-30', '2021-05-01', '49116 Rigney Lane', '05 Ruskin Parkway', '$29.53', 'Xl', 'Done', 'blandit mi in porttitor');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (26, 37, '2021-04-30', '2021-05-01', '58078 Fairview Crossing', '27 Havey Trail', '$9.32', 'Xl', 'Active', 'faucibus orci luctus');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (37, 75, '2021-04-30', '2021-05-01', '74 Spaight Terrace', '7 Sutherland Parkway', '$13.19', 'Comfort', 'Canceled', 'in consequat ut nulla sed');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (61, 27, '2021-04-30', '2021-05-01', '3479 Stephen Terrace', '48469 Main Trail', '$6.30', 'Lux', 'Done', 'scelerisque mauris sit amet');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (99, 88, '2021-04-30', '2021-05-01', '04591 Armistice Street', '50507 6th Pass', '$21.56', 'Green', 'Accepted', 'vestibulum sit amet');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (40, 64, '2021-04-30', '2021-05-01', '125 Springs Lane', '74643 Esch Lane', '$21.58', 'Green', 'Canceled', 'pede malesuada');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (55, 73, '2021-04-30', '2021-05-01', '89 Hallows Point', '6 Dakota Hill', '$10.80', 'Comfort', 'Canceled', 'congue vivamus metus');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (59, 55, '2021-04-30', '2021-05-01', '26191 Aberg Hill', '59705 Sachs Center', '$23.38', 'Green', 'Canceled', 'nulla nisl');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (40, 90, '2021-04-30', '2021-05-01', '5015 Muir Junction', '422 Express Street', '$24.55', 'Comfort', 'Postponed', 'etiam faucibus cursus urna');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (97, 49, '2021-04-30', '2021-05-01', '5410 Dahle Avenue', '0 Scofield Drive', '$17.74', 'Green', 'Active', 'nulla nisl');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (81, 99, '2021-04-30', '2021-05-01', '652 Loftsgordon Trail', '02 Fair Oaks Pass', '$18.65', 'Xl', 'Postponed', 'at nunc commodo placerat');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (35, 60, '2021-04-30', '2021-05-01', '630 Novick Trail', '50900 Service Drive', '$22.13', 'Lux', 'Active', 'vel pede morbi');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (86, 71, '2021-04-30', '2021-05-01', '745 Prentice Plaza', '45425 Schurz Park', '$8.19', 'Comfort', 'InProgress', 'vitae quam');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (37, 61, '2021-04-30', '2021-05-01', '68697 Dayton Park', '5122 Warner Place', '$28.32', 'Basic', 'Done', 'sem praesent id massa');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (60, 70, '2021-04-30', '2021-05-01', '443 Pierstorff Trail', '0 Moulton Terrace', '$12.94', 'Comfort', 'Accepted', 'mauris vulputate');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (13, 62, '2021-04-30', '2021-05-01', '7 Redwing Pass', '7020 Hanover Place', '$12.59', 'Basic', 'Canceled', 'porttitor id');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (100, 41, '2021-04-30', '2021-05-01', '18221 Nevada Way', '27132 Dottie Way', '$12.66', 'Xl', 'InProgress', 'dignissim vestibulum');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (65, 50, '2021-04-30', '2021-05-01', '8980 Forest Dale Way', '7 Killdeer Way', '$5.37', 'Green', 'Active', 'purus eu magna vulputate');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (59, 80, '2021-04-30', '2021-05-01', '083 Hanson Terrace', '2 Kensington Plaza', '$7.17', 'Xl', 'Active', 'vel nulla eget eros elementum');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (13, 48, '2021-04-30', '2021-05-01', '1 Forest Run Center', '557 Jenna Pass', '$26.21', 'Lux', 'Accepted', 'pede venenatis');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (7, 91, '2021-04-30', '2021-05-01', '093 Lerdahl Alley', '9933 Garrison Street', '$11.16', 'Basic', 'InProgress', 'in est');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (92, 63, '2021-04-30', '2021-05-01', '909 Larry Trail', '341 Golf Course Crossing', '$27.38', 'Basic', 'Canceled', 'rutrum at lorem');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (68, 21, '2021-04-30', '2021-05-01', '0135 6th Terrace', '71 Blaine Trail', '$3.63', 'Lux', 'InProgress', 'pede ullamcorper augue a');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (7, 38, '2021-04-30', '2021-05-01', '77705 Pond Lane', '989 Sunbrook Street', '$27.12', 'Lux', 'InProgress', 'nullam orci pede venenatis non');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (91, 81, '2021-04-30', '2021-05-01', '96013 Nova Drive', '9832 Sauthoff Hill', '$21.25', 'Xl', 'Active', 'hac habitasse platea dictumst aliquam');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (43, 9, '2021-04-30', '2021-05-01', '4 Fairfield Parkway', '7 Manley Place', '$4.82', 'Comfort', 'Canceled', 'vel nisl duis');
insert into requests (customer_id, driver_id, created_date, last_update, destination_location, passanger_location, price, car_type, status, description) values (84, 88, '2021-04-30', '2021-05-01', '28890 Grayhawk Alley', '7 Utah Junction', '$18.35', 'Green', 'Accepted', 'aenean fermentum donec ut');
