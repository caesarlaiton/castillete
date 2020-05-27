+++

title = "{{ replace .Name "-" " " | title }}"

date = {{ .Date }}

img = "/jpg/{{ .Name }}-256.jpg"

tags = ["fantasy"]

[_build]
	render = false

+++

