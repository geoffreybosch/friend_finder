INSERT INTO friends (name) VALUES ('Geoffrey'), ('Marina'), ('Carlie'), ('Jamie'), ('Carlos');

INSERT INTO questions (ques) VALUES ("I don't mind when others drive slowly."), ("I try not to eat meat."), ('I would prefer a house in the city vs the country.'), ('When I watch a movie I want it to be funny.');

INSERT INTO scores (friend_id, question_id, answer) VALUES 
(1, 1, 1), 
(1, 2, 1), 
(1, 3, 4), 
(1, 4, 8), 
(2, 1, 3), 
(2, 2, 2), 
(2, 3, 6), 
(2, 4, 5), 
(3, 1, 5), 
(3, 2, 4), 
(3, 3, 3), 
(3, 4, 7), 
(4, 1, 7), 
(4, 2, 7), 
(4, 3, 1), 
(4, 4, 6), 
(5, 1, 2), 
(5, 2, 1), 
(5, 3, 5), 
(5, 4, 10);

-------------------------------------------------


USE friends_db;

SELECT A.friend_id AS Friend1, A.answer AS Answer1, A.question_id AS Question, B.friend_id AS Friend2, B.answer AS Answer2
FROM scores A, scores B
WHERE A.friend_id <> B.friend_id
AND A.question_id = B.question_id
ORDER BY A.question_id;

SELECT scores.friend_id, friends.name
FROM scores
INNER JOIN friends
ON scores.friend_id = friends.id;

SELECT friends.name
FROM scores
INNER JOIN friends
ON scores.friend_id = friends.id;