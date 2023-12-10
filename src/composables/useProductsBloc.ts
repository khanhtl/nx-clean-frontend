import { Bloc } from "@genz-shop/core";

import { onMounted, onBeforeMount, readonly, type Ref, type DeepReadonly, ref } from "vue";

export function usePlocState<S>(ploc: Bloc<S>): DeepReadonly<Ref<S>> {
    const state = ref(ploc.state) as Ref<S>;

    const stateSubscription = (newState: S) => {
        state.value = newState;
    };

    onMounted(() => {
        ploc.subscribe(stateSubscription);
    });

    onBeforeMount(() => {
        ploc.unsubscribe(stateSubscription);
    });

    return readonly(state);
}