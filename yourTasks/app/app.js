'use strict';

angular.module('myApp', [
	'ngRoute',
	'myApp.version',
	'ionic.utils',
	'ui.bootstrap'
])
		.controller('TimeTracker', ['$scope', '$timeout', '$localstorage', '$window',
			function ($scope, $timeout, $localstorage, $window) {
				var TASKS = "tasks";

				$scope.dataTasks = $localstorage.getObject(TASKS);
				var emptyTasks = true;
				for (var task in $scope.dataTasks) {
					emptyTasks = false;
					break;
				}
				if (emptyTasks) {
					$scope.dataTasks = {};
					createDataTask();
				}
				$scope.timeout = [];
				storeTasks();

				$scope.addTask = function () {
					createDataTask();
					$localstorage.setObject(TASKS, $scope.dataTasks);
				};
				$scope.removeTask = function (task) {
					delete this.dataTasks[task.id];
					$timeout.cancel($scope.timeout[task.id]);
					$scope.timeout[task.id] = null;
					$localstorage.setObject(TASKS, $scope.dataTasks);
				};

				$scope.start = function (task) {
					tickTime(task);
					task.buttonStartActive = true;
					task.buttonStopActive = false;
				};
				$scope.stop = function (task) {
					$timeout.cancel($scope.timeout[task.id]);
					task.buttonStartActive = false;
					task.buttonStopActive = true;
				};
				$scope.completed = function(task){
					this.stop(task);
					task.buttonStartActive = true;
					task.isDisabled = true;
				};
				$scope.amount = function (task) {
					var amount = task.payment * (task.timeHours * 1 + task.timeMinutes * 0.01 + task.timeSeconds * 0.0001);
					if(typeof(task.payment) == 'number'){
						task.showAmountError = false;
						return amount.toFixed(2);
					} else{
						task.showAmountError = true;
					}
				};
				angular.element($window).on('beforeunload', function () {
					$localstorage.setObject(TASKS, $scope.dataTasks);
				});

				function rnd() {
					return Math.floor(Math.random() * 1000000000);
				}
				function createDataTask() {
					var id = 0;
					for(var key in $scope.dataTasks){
						if(key >= id) id = key;
					}
					id = ++id;
					$scope.dataTasks[id] = {
						id: id,
						taskValue: '',
						nameTask: '',
						payment: 0,
						buttonStartActive: false,
						buttonStopActive: false,
						isDisabled: false,
						timeHours: 0,
						timeMinutes: 0,
						timeSeconds: 0,
						showAmountError: false
					};
				}
				function tickTime(task) {
					task.timeSeconds++;
					if (task.timeSeconds >= 60) {
						task.timeSeconds = 0;
						task.timeMinutes++;

					if (task.timeMinutes >= 60) {
							task.timeMinutes = 0;
							task.timeHours++;
						}
					}
					$scope.timeout[task.id] = $timeout(function () {
						tickTime(task);
					}, 1000);
				}
				function storeTasks() {
					$localstorage.setObject(TASKS, $scope.dataTasks);
					$scope.storeTimer = $timeout(storeTasks, 30000);
				}
			}]);