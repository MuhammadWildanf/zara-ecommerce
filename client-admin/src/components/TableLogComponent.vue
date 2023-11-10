<script>
export default {
  props: ['history', 'index'],
}
</script>

<template>
  <tr :key="history.id">
    <td>{{index + 1 }}</td>
    <td>{{ history.title }}</td>
    <td>{{ history.description }}</td>
    <td>{{ history.createdAt }}</td>
    <td>{{ history.updatedBy }}</td>
  </tr>
</template>
