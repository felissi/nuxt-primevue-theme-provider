import { flattenObject } from "./flatten-object";
import { test, expect } from "vitest";

test("should flatten nested object correctly with custom prefix and interfix", () => {
  const expectAnswer = {
    "custom_prefix.font.size.sm": 14,
    "custom_prefix.font.size.md": 16,
    "custom_prefix.font.weight.md": 400,
    "custom_prefix.font.weight.bold": 600,
  };

  const input = {
    font: {
      size: {
        sm: 14,
        md: 16,
      },
      weight: {
        md: 400,
        bold: 600,
      },
    },
  };

  const options = {
    prefix: "custom_prefix",
    interfix: ".",
  };

  const testAnswer = flattenObject(input, options);

  expect(testAnswer).toEqual(expectAnswer);
});

test("should flatten nested object correctly with multiple layers", () => {
  const expectAnswer = {
    "font.size.sm.xs": 10,
    "font.size.sm.sm": 14,
    "font.size.sm.md": 16,
    "font.size.md.xs": 12,
    "font.size.md.sm": 16,
    "font.size.md.md": 20,
    "font.weight.md.sm": 400,
    "font.weight.md.md": 500,
    "font.weight.md.lg": 600,
  };

  const input = {
    font: {
      size: {
        sm: {
          xs: 10,
          sm: 14,
          md: 16,
        },
        md: {
          xs: 12,
          sm: 16,
          md: 20,
        },
      },
      weight: {
        md: {
          sm: 400,
          md: 500,
          lg: 600,
        },
      },
    },
  };

  const testAnswer = flattenObject(input, { interfix: "." });

  expect(testAnswer).toEqual(expectAnswer);
});

test("should flatten nested object correctly with different interfix", () => {
  const expectAnswer = {
    font_size_sm: 14,
    font_size_md: 16,
    font_weight_md: 400,
    font_weight_bold: 600,
  };

  const input = {
    font: {
      size: {
        sm: 14,
        md: 16,
      },
      weight: {
        md: 400,
        bold: 600,
      },
    },
  };

  const options = {
    interfix: "_",
  };

  const testAnswer = flattenObject(input, options);

  expect(testAnswer).toEqual(expectAnswer);
});
