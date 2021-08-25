const app = {
	init: function() {
		this.form.init();
	},
	api_request: function(url, is_reload) {
		fetch(url).then((res) => {
			if (is_reload && res.ok) {
				location.reload();
			}
		}).catch((err) => {
			console.log(err);
			console.error(err);
		})
	},
	form: {
		init: function() {
			document.querySelector('.new_extension_button').addEventListener('click', () => { app.form.submit_extension(); })
		},
		submit_extension: function() {
			const ext_name = document.querySelector(".new_extension_input").value;
			if (ext_name.length === 0) {
				alert('확장자 명을 입력해주세요.');
			}
			else if (ext_name.length > 20) {
				alert('확장자 명은 최대 20자리입니다.');
			}
			else {
				app.api_request(`/api/add/${ext_name}`, true);
			}
		},
		delete_extension: function(ext) {
			if (confirm(`${ext.dataset.id} 확장자를 제거하시겠습니까?`)) {
				app.api_request(`/api/delete/${ext.dataset.id}`, true);
			}
		},
		check_extension: function(ext) {
			app.api_request(`/api/${ext.checked ? "check" : "uncheck" }/${ext.value}`, false);
		}
	}
}

document.addEventListener("DOMContentLoaded", function(){
	app.init();
});
