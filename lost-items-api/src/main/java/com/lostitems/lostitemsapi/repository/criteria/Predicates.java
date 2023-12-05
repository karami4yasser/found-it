package com.lostitems.lostitemsapi.repository.criteria;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Predicate;

import java.time.LocalDate;

public class Predicates {

  public static Predicate contains(
    CriteriaBuilder cb,
    Expression<String> attribute,
    String contains,
    boolean isCaseSensitive
  ) {
    if (isCaseSensitive) {
      return cb.like(attribute, "%" + contains + "%");
    }
    return cb.like(cb.lower(attribute), "%" + contains.toLowerCase() + "%");
  }

  public static Predicate dateBetween(
          CriteriaBuilder cb,
          Expression<LocalDate> attribute,
          LocalDate dateLeft,
          LocalDate dateRight
  ) {
    return cb.between(attribute,dateLeft,dateRight);
  }

}
