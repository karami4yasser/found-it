INSERT INTO founditschema.users(id, "firstName", "lastName", "phone", password)
values ('0ebacabc-83fa-11ee-b962-0242ac120002', 'userXf', 'userXl',
        '+212602394387', '$2y$10$5nSdY2ZqbBgnHLsxq7rIJukxlWL8waLKNmfCs9S52RBvUe/xG2E02');

INSERT INTO founditschema.items(id, "postDate", "type","title","description","longitude","latitude","category","posterId","returned", "range")
values ('0ebacabc-83fa-11ee-b962-0242ac120001', '2021-07-22', 'FOUND','this titles contains the name POWERFUL','this description contains the WEAK', 33.529733, -7.639389,'category 1','0ebacabc-83fa-11ee-b962-0242ac120002',TRUE, 0);

INSERT INTO founditschema.items(id, "postDate", "type","title","latitude","longitude","category","posterId","returned", "range")
values ('0ebacabc-83fa-11ee-b962-0242ac120005', '2020-07-22', 'LOST','This item is lost tangier',35.7595,5.8340,'category 2','0ebacabc-83fa-11ee-b962-0242ac120002',FALSE, 0);

INSERT INTO founditschema.items(id, "postDate", "type","title","longitude","latitude","category","posterId","returned", "range")
values ('0ebacabc-83fa-11ee-b962-0242ac120007', '2023-07-22', 'LOST','This item is lost casa',33.5731,33.5731,'category 2','0ebacabc-83fa-11ee-b962-0242ac120002',FALSE, 0);

INSERT INTO founditschema.items(id, "postDate", "type","title","latitude","longitude","category","posterId","returned", "range")
values ('a09959e6-9451-11ee-b9d1-0242ac120002', '2022-07-22', 'LOST','This item is lost casa', 33.532910, -7.640958,'category 2','0ebacabc-83fa-11ee-b962-0242ac120002',FALSE, 500);