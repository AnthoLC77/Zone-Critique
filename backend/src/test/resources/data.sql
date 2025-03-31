-- Créer la table medias
CREATE TABLE medias (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        titre VARCHAR(255) NOT NULL,
                        image VARCHAR(255),
                        date DATE NOT NULL,
                        resume TEXT,
                        type VARCHAR(50) NOT NULL,
                        note_general DOUBLE,
                        note_amis DOUBLE
);

INSERT INTO medias (titre, image, date, resume, type, note_general, note_amis)
VALUES
    ('Film Test', 'image2.jpg', '2025-03-25', 'Résumé du film 2', 'FILM', 7.5, 6.8),
    ('Film Test 2', 'image3.jpg', '2025-03-26', 'Résumé du film 3', 'FILM', 9.2, 8.0),
    ('Film Test 3', 'image4.jpg', '2025-03-27', 'Résumé du film 4', 'FILM', 6.5, 7.0);
