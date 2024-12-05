import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchSoftwaresComponent } from "./search-softwares.component";

describe("SearchSoftwaresComponent", () => {
	let component: SearchSoftwaresComponent;
	let fixture: ComponentFixture<SearchSoftwaresComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SearchSoftwaresComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(SearchSoftwaresComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
