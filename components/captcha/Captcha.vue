<template>
	<div class="center-container" v-if="ready">
		<div class="captcha-container">
			<div class="captcha-task">
				<div class="captcha-task-text">
					Select all squares with
					<div style="font-size: 60px">
						<b>{{ task === "" ? "..." : task }}</b>
					</div>
					If there are none, click skip
				</div>
			</div>
			<div class="activity-container">
				<div class="loading" v-if="activityIndex === 0">
					<span class="loader"></span>
				</div>
				<CaptchaSelectInImage :grid-size="25" @task-assign="assignTask" @task-ready="assignReady" v-if="activityIndex === 1" />
				<CaptchaCaptcha9Grid @task-assign="assignTask" @task-ready="assignReady" v-if="activityIndex === 2" />
			</div>
			<div class="captcha-button-container">
				<div class="captcha-reroll">
					<img src="images/refresh.svg" alt="Reroll" @click="rollActivity" />
				</div>
				<div class="captcha-button-right">
					<div class="captcha-button-activity-counter">
						{{ doneActivities }} / 3
					</div>
					<div class="captcha-button" @click="submitActivity">
						{{ taskDone ? "Submit" : "Skip" }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default defineComponent({
	data() {
		return {
			ready: false,
			displayCaptcha: useDisplayCaptcha(),
			task: "",
			taskDone: false,
			activityIndex: 0,
			doneActivities: 0,
		};
	},
	async mounted() {
		this.ready = true;
		await this.rollActivity();
	},
	methods: {
		assignTask(task: string) {
			this.task = task;
		},
		assignReady(ready: boolean) {
			this.taskDone = ready;
		},
		async rollActivity() {
			const activities = 2;
			const activity = Math.floor(Math.random() * activities);
			this.activityIndex = 0;
			this.task = "";
			await new Promise(r => setTimeout(r, 2500));
			this.activityIndex = activity + 1;
		},
		async submitActivity() {
			if (this.taskDone) {
				if (++this.doneActivities >= 3) {
					this.displayCaptcha = false;
				}
			}
			await this.rollActivity();
			this.taskDone = false;
		},
	}
});
</script>

<style scoped>
.center-container {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
}

.captcha-container {
	background-color: #fff;
	padding: 10px;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.captcha-task {
	width: 100%;
	margin-bottom: 10px;
	font-size: 30px;
	background: var(--captcha-color);
	font-family: Roboto Flex, sans-serif;
	font-weight: 600;
	border-radius: 5px;
}

.captcha-task-text {
	margin: 35px;
}

.activity-container {
	width: 55vh;
	height: 55vh;
}

.captcha-button-container {
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-top: 15px;
}

.captcha-reroll {
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	margin: 10px;
}

.captcha-button-right {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	font-family: Roboto Flex, sans-serif;
}

.captcha-button-activity-counter {
	color: #000;
	margin-right: 20px;
}

.captcha-button {
	background-color: var(--captcha-color);
	font-weight: 600;
	padding: 15px 30px;
	border-radius: 5px;
	cursor: pointer;
}

.loading {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
}

.loader {
	width: 80px;
	height: 80px;
	border: 10px solid var(--captcha-color);
	border-bottom-color: transparent;
	border-radius: 50%;
	display: inline-block;
	box-sizing: border-box;
	animation: rotation 2s linear infinite;
}

@keyframes rotation {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
} 

</style>
