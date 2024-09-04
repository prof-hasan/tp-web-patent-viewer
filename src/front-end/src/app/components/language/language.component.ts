import { MatIcon } from "@angular/material/icon";
import { NgClass } from "@angular/common";
import { Component, computed, input, Signal } from "@angular/core";

@Component({
	selector: "app-language",
	standalone: true,
	imports: [MatIcon, NgClass],
	templateUrl: "./language.component.html",
	styleUrl: "./language.component.scss"
})
export class LanguageComponent {
	public language = input("");
	public languageClass: Signal<string>;

	constructor () {
		this.languageClass = computed(() => {
			switch (this.language().toUpperCase()) {
				case ".NET":
				case "C#":
				case "FRAMEWORK .NET":
				case "FRAMEWORK":
					return "lang-csharp";
				case "C":
					return "lang-c";
				case "C++":
					return "lang-cpp";
				case "CSS":
					return "lang-css";
				case "GO":
					return "lang-go";
				case "HASKELL":
					return "lang-haskell";
				case "HTML":
					return "lang-html";
				case "JAVA":
				case "JAVA 8":
				case "NETBEANS":
				case "JSP":
				case "JAVAFX":
					return "lang-java";
				case "JAVA SCRIPT":
				case "JAVASCRIPT":
				case "NODEJS":
					return "lang-javascript";
				case "KOTLIN":
					return "lang-kotlin";
				case "LUA":
					return "lang-lua";
				case "PHP":
					return "lang-php";
				case "PYTHON":
					return "lang-python";
				case "R":
					return "lang-r";
				case "RUBY":
					return "lang-ruby";
				case "SWIFT":
					return "lang-swift";
				case "TYPE SCRIPT":
				case "TYPESCRIPT":
					return "lang-typescript";
				default:
					return "";
			}
		});
	}
}
