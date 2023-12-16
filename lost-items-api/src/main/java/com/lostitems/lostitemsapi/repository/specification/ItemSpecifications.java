package com.lostitems.lostitemsapi.repository.specification;

import com.lostitems.lostitemsapi.enumeration.ItemType;
import com.lostitems.lostitemsapi.model.Item;
import com.lostitems.lostitemsapi.model.Item_;
import com.lostitems.lostitemsapi.repository.criteria.Predicates;
import com.lostitems.lostitemsapi.repository.criteria.SpecificationUtils;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Optional;

import static com.lostitems.lostitemsapi.repository.criteria.SpecificationUtils.or;
import static com.lostitems.lostitemsapi.repository.criteria.SpecificationUtils.trueSpec;

@Component
public class ItemSpecifications {



    public  Specification<Item> titleContainsFilter( String contains, boolean isCaseSensitive) {
        return (itemRoot, query, cb) ->
                Predicates.contains(cb, itemRoot.get(Item_.title), contains, isCaseSensitive);
    }

    public  Specification<Item> descriptionContainsFilter( String contains, boolean isCaseSensitive) {
        return (itemRoot, query, cb) ->
                Predicates.contains(cb, itemRoot.get(Item_.description), contains, isCaseSensitive);
    }

    public  Specification<Item> itemsTextContains( Optional<String> containsOps, boolean isCaseSensitive) {
        return containsOps.map(s -> or(titleContainsFilter(s, false), descriptionContainsFilter(s, false))).orElseGet(SpecificationUtils::trueSpec);
    }

    
    public Specification<Item> timeFilter( Optional<LocalDate> postDateLeftOpt, Optional<LocalDate> postDateRightOpt) {
        return (itemRoot, query, cb) ->
                Predicates.dateBetween(cb, itemRoot.get(Item_.postDate), postDateLeftOpt.orElse(LocalDate.of(1,1,1)), postDateRightOpt.orElse(LocalDate.now()));
    }

    
    public Specification<Item> typeFilter( Optional<ItemType> itemTypeOpt){
        return itemTypeOpt
                .map(s -> (Specification<Item>) (itemRoot, query, cb) -> cb.equal(itemRoot.get(Item_.type),s))
                .orElse(trueSpec());
    }

    
    public Specification<Item> categoryFilter( Optional<String> categoryTypeOpt){
        return categoryTypeOpt
                .map(s -> (Specification<Item>) (itemRoot, query, cb) -> cb.equal(itemRoot.get(Item_.category),s))
                .orElse(trueSpec());
    }

    
    public Specification<Item> isReturned( Optional<Boolean> returnedOpt) {
        return returnedOpt
                .map(s -> (Specification<Item>) (itemRoot, query, cb) -> cb.equal(itemRoot.get(Item_.returned), s))
                .orElse(trueSpec());
    }
    
    public Specification<Item> nearLocation( Optional<Double> inputLatitudeOps, Optional<Double>  inputLongitudeOps, Optional<Double> rangeInMOps) {
        if (inputLatitudeOps.isEmpty() || inputLongitudeOps.isEmpty() || rangeInMOps.isEmpty()) {
            return trueSpec();
        }
        double inputLatitude = inputLatitudeOps.get();
        double inputLongitude = inputLongitudeOps.get();
        double distanceInM = rangeInMOps.get();
        return (Root<Item> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> {
            Expression<Double> distanceBetweenTwoPoints = builder.function("founditschema.calculate_haversine_distance", Double.class,
                    root.get(Item_.range), root.get(Item_.latitude), root.get(Item_.longitude), builder.literal(inputLatitude).as(Double.class), builder.literal(inputLongitude).as(Double.class));
            return builder.lessThanOrEqualTo(distanceBetweenTwoPoints, distanceInM);
        };
    }
}

