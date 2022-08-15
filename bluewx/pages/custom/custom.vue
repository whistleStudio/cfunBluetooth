<template>
	<view>
		<button @touchstart="tap1">1</button>
		<button @touchstart="tap2">2</button>
		<test></test>
	</view>
</template>

<script setup>
	function tap1 () {
		console.log(1)
	}
	function tap2 () {
		console.log(2)
	}
</script>

<style>

</style>
