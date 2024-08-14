import { Get } from "../../utils";
import { MetaType, Never, Error, Union } from "..";
import { Exclusion, Value, Excluded } from "../exclusion";
import { IntersectUnion } from "./union";
import { ClearIntersections, Intersect } from "./index";
export declare type ClearExclusionIntersections<A> = Exclusion<ClearIntersections<Value<A>>, ClearIntersections<Excluded<A>>>;
export declare type IntersectExclusion<A, B> = {
    any: A;
    never: Never;
    const: Exclusion<Intersect<Value<A>, B>, Excluded<A>>;
    enum: Exclusion<Intersect<Value<A>, B>, Excluded<A>>;
    primitive: Exclusion<Intersect<Value<A>, B>, Excluded<A>>;
    array: Exclusion<Intersect<Value<A>, B>, Excluded<A>>;
    tuple: Exclusion<Intersect<Value<A>, B>, Excluded<A>>;
    object: Exclusion<Intersect<Value<A>, B>, Excluded<A>>;
    union: IntersectUnion<B, A>;
    intersection: Error<"Cannot intersect intersection">;
    exclusion: Exclusion<Intersect<Value<A>, Value<B>>, Union<Excluded<A> | Excluded<B>>>;
    error: B;
    errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends MetaType ? Get<B, "type"> : "errorTypeProperty"];
