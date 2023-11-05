import {
  Fragment,
  reactive,
  provide,
  computed,
  defineComponent,
  h,
  inject,
  createVNode,
  type PropType,
  type InjectionKey,
  type ExtractPublicPropTypes,
} from "vue";
import { watchEffect } from "vue";
import { useHead } from "@unhead/vue";
// import {useHead} from ""
import { makeStringProp } from "@/utils/props";
import { theme } from "./default-theme";
import { flattenObject } from "./flatten-object";
import { useHeadTheme } from "./useHeadTheme";

type Tag = keyof HTMLElementTagNameMap | "Fragment";
type Scope = "local" | "global";

export const defaultPrefix: string = "--sui";
export const defaultTagName: Tag = "div";
export const defaultScope: Scope = "global";
export const defaultTheme: string = "light";

export const globalInjectCount = 0;
export const themeProviderProps = {
  theme: makeStringProp(defaultTheme),
  themeVars: {
    type: Object,
    default: () => reactive(theme),
  },
  prefix: makeStringProp(defaultPrefix),
  tag: makeStringProp<Tag>(defaultTagName),
  scope: makeStringProp<Scope>(defaultScope),
};
export type Props = ExtractPublicPropTypes<typeof themeProviderProps>;

type InjectedThemeType = InjectionKey<typeof themeProviderProps>;
export const THEME_PROVIDER_KEY: InjectionKey<typeof themeProviderProps> =
  Symbol("test");
type destructInjectionKey<T> = T extends InjectionKey<infer K> ? K : never;

/* Functions */
/** @description map `gray1` to `gray-1` */
function insertDash(str: string) {
  return str.replace(/([a-zA-Z])(\d)/g, "$1-$2");
}

// function mapThemeVarsToCSSVars(themeVars: Record<string, Numeric>) {
//   const cssVars: Record<string, Numeric> = {};
//   Object.keys(themeVars).forEach((key) => {
//     const formattedKey = insertDash(kebabCase(key));
//     cssVars[`--van-${formattedKey}`] = themeVars[key];
//   });
//   return cssVars;
// }

export function useTheme<T extends InjectionKey<any> = InjectedThemeType>(
  providedKey = THEME_PROVIDER_KEY,
): destructInjectionKey<T> {
  return inject(providedKey);
}
export function getStyle<T>(
  s: T,
  { prefix = defaultPrefix }: { prefix?: typeof defaultPrefix },
) {
  return flattenObject(s, { prefix });
}
function getClassName(prefix: string = "sui") {
  return `${prefix}-theme-provider`;
}

export default defineComponent({
  name: "ThemeProvider",
  props: themeProviderProps,
  //   provide: reactive({ abc: 123 }),
  setup(props, { slots }) {
    const hash = btoa(JSON.stringify(props)).toString(8);
    const theme = props.themeVars[props.theme];
    const colorTheme = ["normal", "light", "dark"].includes(props.theme)
      ? props.theme
      : "light";
    useHeadTheme(theme, { key: hash });
    useHeadTheme({ colorTheme }, { key: hash });
    const tagName = computed(() =>
      props.tag === "Fragment" ? Fragment : props.tag,
    );
    const style = computed(() => ({
      ...getStyle(theme, { prefix: props.prefix }),
      "color-scheme": colorTheme,
    }));
    const providedProps = computed(() => props);
    provide(THEME_PROVIDER_KEY, providedProps);
    return () => {
      // return <`${tagName.value}`>{slots.default() ?? false}</`${tagName.value}`>;
      return createVNode(
        tagName.value,
        {
          class: [getClassName(), props.theme],
          style: style.value,
          "data-theme": props.theme,
        },
        slots?.default?.(),
      );
    };
  },
});
