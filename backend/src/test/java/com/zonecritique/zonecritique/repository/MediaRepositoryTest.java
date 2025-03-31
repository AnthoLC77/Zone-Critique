package com.zonecritique.zonecritique.repository;

import com.zonecritique.zonecritique.entity.Media;
import com.zonecritique.zonecritique.entity.TypeDeMedia;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;


import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class MediaRepositoryTest {

    @Autowired
    private MediaRepository mediaRepository;

    @Test
    void shouldGetAllMedia() {
        List<Media> media = mediaRepository.findAll();
        assertEquals(3, media.size());
    }

    @Test
    void shouldGetMediaById() {
        Media media =  mediaRepository.findById(1L).orElse(null);
        assertNotNull(media);
        assertEquals(1L, media.getId());
    }

    @Test
    void shouldGetMediaByTitle() {
        Media media = mediaRepository.findById(1L).orElse(null);
        assertNotNull(media);
        assertEquals("Film Test", media.getTitre());
    }

    @Test
    void shouldDeleteMedia() {
        Media media = mediaRepository.findById(1L).orElse(null);
        assertNotNull(media);

        mediaRepository.delete(media);

        Media deleted = mediaRepository.findById(1L).orElse(null);
        assertNull(deleted);
    }

    @Test
    void shouldUpdateMedia() {
        Media media = mediaRepository.findById(1L).orElse(null);
        assertNotNull(media);

        media.setTitre("Jurassic Park");
        mediaRepository.save(media);

        Media updated = mediaRepository.findById(1L).orElse(null);
        assertNotNull(updated);
        assertEquals("Jurassic Park", updated.getTitre());
    }

    @Test
    void shouldSaveMedia() {
        Media media = new Media();
        media.setTitre("New york 1997");
        media.setImage("newyork.jpg");
        media.setDate(LocalDate.of(1997, 1, 1));
        media.setResume("Je suis le resumer du film New york 1997");
        media.setType(TypeDeMedia.FILM);
        media.setNoteAmis(7.1);
        media.setNoteGeneral(6.8);

        Media savedMedia = mediaRepository.save(media);

        assertNotNull(savedMedia);
        assertEquals("New york 1997", savedMedia.getTitre());
        assertEquals("newyork.jpg", savedMedia.getImage());
        assertEquals(LocalDate.of(1997, 1, 1), savedMedia.getDate());
        assertEquals(TypeDeMedia.FILM, savedMedia.getType());
        assertEquals(7.1, savedMedia.getNoteAmis());
        assertEquals(6.8, savedMedia.getNoteGeneral());
    }

    @Test
    void shouldFindMediaByTitleAndDate() {
        List<Media> mediaList = mediaRepository.findByTitreAndDate("Film Test", LocalDate.parse("2025-03-25"));
        assertFalse(mediaList.isEmpty());
        assertEquals("Film Test", mediaList.get(0).getTitre());
    }

    @Test
    void shouldReturnEmptyMediaNotFound() {
        Media media = mediaRepository.findById(999L).orElse(null);
        assertNull(media);
    }

}