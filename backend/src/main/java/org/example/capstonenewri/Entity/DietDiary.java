package org.example.capstonenewri.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class DietDiary {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "dietdiary_id")
    private Long id;

    private BigDecimal energy_kcal;
    private BigDecimal water_gram;
    private BigDecimal protein_gram;
    private BigDecimal fat_gram;
    private BigDecimal ashcontent_gram;
    private BigDecimal carbohydrate_gram;
    private BigDecimal sugars_gram;
    private BigDecimal dietary_fiber_gram;
    private BigDecimal calcium_miligram;
    private BigDecimal iron_miligram;
    private BigDecimal phosphorus_miligram;
    private BigDecimal potassium_miligram;
    private BigDecimal sodium_miligram;
    private BigDecimal vitaminA_microgram;
    private BigDecimal retinol_microgram;
    private BigDecimal betaCarotene_microgram;
    private BigDecimal thiamin_miligram;
    private BigDecimal riboflavin_miligram;
    private BigDecimal niacin_miligram;
    private BigDecimal vitaminC_miligram;
    private BigDecimal vitaminD_microgram;
    private BigDecimal cholesterol_miligram;
    private BigDecimal saturated_fatty_acids_gram;
    private BigDecimal trans_fatty_acids_gram;

    @OneToOne
    @JoinColumn(name = "diet_id")
    private Diet diet;


}
