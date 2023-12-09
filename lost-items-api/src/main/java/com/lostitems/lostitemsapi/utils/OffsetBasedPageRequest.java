package com.lostitems.lostitemsapi.utils;

import com.google.common.base.MoreObjects;
import java.util.Objects;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

/**
 * idea from https://stackoverflow.com/a/36365522
 */
public class OffsetBasedPageRequest implements Pageable {

    private final int limit;
    private final int offset;
    private final Sort sort;

    /**
     * Creates a new {@link OffsetBasedPageRequest} with sort parameters applied.
     *
     * @param offset zero-based offset.
     * @param limit Number of elements being returned
     * @param sort   can be {@literal null}.
     */
    public OffsetBasedPageRequest(int offset, int limit, Sort sort) {
        if (offset < 0) {
            throw new IllegalArgumentException("Offset index must not be less than zero!");
        }

        if (limit < 1) {
            throw new IllegalArgumentException("Limit must not be less than one!");
        }
        this.limit = limit;
        this.offset = offset;
        this.sort = sort;
    }

    /**
     * Creates a new {@link OffsetBasedPageRequest} with sort parameters applied.
     *
     * @param offset zero-based offset.
     * @param limit Number of elements being returned
     * @param direction        the direction of the {@link Sort} to be specified, can be {@literal null}.
     * @param sortByProperties the properties to sort by, must not be {@literal null} or empty.
     */
    public OffsetBasedPageRequest(int offset, int limit, Sort.Direction direction, String... sortByProperties) {
        this(offset, limit, Sort.by(direction, sortByProperties));
    }

    /**
     * Creates a new {@link OffsetBasedPageRequest} with sort parameters applied.
     *
     * @param offset zero-based offset.
     * @param limit Number of elements being returned
     */
    public OffsetBasedPageRequest(int offset, int limit) {
        this(offset, limit, Sort.unsorted());
    }

    public OffsetBasedPageRequest(int offset, int limit, Sort.Order... orders) {
        this(offset, limit, Sort.by(orders));
    }

    @Override
    public int getPageNumber() {
        return offset / limit;
    }

    @Override
    public int getPageSize() {
        return limit;
    }

    @Override
    public long getOffset() {
        return offset;
    }

    @Override
    public Sort getSort() {
        return sort;
    }

    @Override
    public Pageable next() {
        return new OffsetBasedPageRequest((int) (getOffset() + getPageSize()), getPageSize(), getSort());
    }

    public OffsetBasedPageRequest previous() {
        return hasPrevious()
                ? new OffsetBasedPageRequest((int) (getOffset() - getPageSize()), getPageSize(), getSort())
                : this;
    }

    @Override
    public Pageable previousOrFirst() {
        return hasPrevious() ? previous() : first();
    }

    @Override
    public Pageable first() {
        return new OffsetBasedPageRequest(0, getPageSize(), getSort());
    }

    @Override
    public Pageable withPage(int pageNumber) {
        return new OffsetBasedPageRequest(
                pageNumber * getPageSize(),
                (pageNumber * getPageSize()) + getPageSize(),
                getSort()
        );
    }

    @Override
    public boolean hasPrevious() {
        return offset > limit;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        OffsetBasedPageRequest that = (OffsetBasedPageRequest) o;
        return limit == that.limit && offset == that.offset && Objects.equals(sort, that.sort);
    }

    @Override
    public int hashCode() {
        return Objects.hash(limit, offset, sort);
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this).add("limit", limit).add("offset", offset).add("sort", sort).toString();
    }
}
