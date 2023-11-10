<script>
export default {
  props: ['category', 'index']
}
</script>

<template>
  <tr :key="category.id">
    <th>{{ index + 1 }}</th>
    <td>{{ category.name }}</td>
  </tr>
</template>
