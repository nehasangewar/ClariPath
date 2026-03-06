package com.claripath.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "onboarding_questions")
public class OnboardingQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "question_text", columnDefinition = "TEXT")
    private String questionText;
    @Column(name = "question_type")
    private String questionType;
    private String field;
    @Column(name = "order_number")
    private Integer orderNumber;

    public Long getId() { return id; }
    public String getQuestionText() { return questionText; }
    public String getQuestionType() { return questionType; }
    public String getField() { return field; }
    public Integer getOrderNumber() { return orderNumber; }
}