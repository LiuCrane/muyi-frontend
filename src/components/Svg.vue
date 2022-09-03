<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    },
  },
};
</script>

<style scoped>
.svg-icon {
  margin-right: 20px;
  width: 35px;
  height: 27px;
  vertical-align: -0.25em;
  fill: currentColor;
  overflow: hidden;
}
.bell {
  width: 27px;
  height: 27px;
  margin-right: 0px;
  margin-right: 15px;
}
.Edit {
  cursor: pointer;
  margin-right: 0px;
}
</style>
