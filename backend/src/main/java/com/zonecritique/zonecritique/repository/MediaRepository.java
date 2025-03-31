package com.zonecritique.zonecritique.repository;

import com.zonecritique.zonecritique.entity.Media;
import com.zonecritique.zonecritique.entity.TypeDeMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MediaRepository extends JpaRepository<Media, Long> {
    List<Media>findByType(TypeDeMedia typeDeMedia);
    Optional<Media> findByTitreAndType(String titre, TypeDeMedia type);

    // Les prochaines sorties
    @Query("SELECT m FROM Media m WHERE m.type = :type AND m.date > CURRENT_DATE ORDER BY m.date ASC")
    List<Media> findTop10UpcomingByType(@Param("type") TypeDeMedia type);

    //Les media du moments
    @Query("SELECT m FROM Media m WHERE m.type = :type AND m.date <= CURRENT_DATE ORDER BY m.date DESC")
    List<Media> findByTypeOrderByDateDesc(@Param("type") TypeDeMedia type);



    List<Media> findByTypeOrderByNoteGeneralDesc(TypeDeMedia type);

    List<Media> findByTitreAndDate(String titre, LocalDate date);
}
