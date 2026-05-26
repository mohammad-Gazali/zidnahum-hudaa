import { booleanAttribute, Component, computed, inject, input } from "@angular/core";
import { MatCard } from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";
import { MemoPipe, MemoItemType } from "@shared";
import { StudentComponent } from "../student.component";

@Component({
  selector: "app-student-memo",
  imports: [MatCard, MatDivider, MemoPipe],
  templateUrl: "./student-memo.component.html",
  styleUrl: "./student-memo.component.scss",
})
export class StudentMemoComponent {
  public viewing = input(false, { transform: booleanAttribute });

  protected student = inject(StudentComponent).student;

  MemoItemType = MemoItemType;

  private studentSections = computed(() => {
    const result: number[][] = [];
    const sectionItems = this.viewing()
      ? (this.student()?.q_viewing as number[])
      : (this.student()?.q_memorizing as number[]);

    for (let i = 0; i < 30; i++) {
      if (i === 0) {
        result.push(sectionItems.slice(0, 22));
      } else if (i !== 29) {
        result.push(sectionItems.slice(i * 20 + 1, i * 20 + 21));
      } else {
        result.push(sectionItems.slice(581));
      }
    }

    return result;
  });
  protected toContinueSectionsMessage = computed(() => {
    const sectionsState = this.studentSections().map((section) =>
      section.every(
        (item) => item === MemoItemType.NEW || item === MemoItemType.OLD,
      )
        ? ("Done" as const)
        : section.every((item) => item === MemoItemType.NON)
          ? "Empty"
          : "Progress",
    );

    if (sectionsState.filter((item) => item === "Progress").length === 0)
      return "";

    return sectionsState
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item === "Progress")
      .map(({ index }) => `الجزء ${index + 1}`)
      .join(" + ");
  });
}
