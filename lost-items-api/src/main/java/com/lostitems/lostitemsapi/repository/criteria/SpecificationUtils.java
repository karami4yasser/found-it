package com.lostitems.lostitemsapi.repository.criteria;


import org.springframework.data.jpa.domain.Specification;

import java.util.stream.Stream;

public class SpecificationUtils {

  private static final Specification<?> TRUE_SPEC = Specification.where(((root, query, cb) -> cb.conjunction()));

  @SuppressWarnings("unchecked")
  public static <T> Specification<T> trueSpec() {
    return (Specification<T>) TRUE_SPEC;
  }

  public static  @SafeVarargs <T> Specification<T> and(Specification<T>... specs) {
    return Stream.of(specs).reduce(Specification::and).orElse(trueSpec());
  }

  public static  @SafeVarargs <T> Specification<T> or( Specification<T>... specs) {
    return Stream.of(specs).reduce(Specification::or).orElse(trueSpec());
  }
}
