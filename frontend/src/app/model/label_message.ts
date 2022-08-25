export class LableMessage {
  label: string;
  selected_text: string;
}

export class SelectedLabels {
  paragraph: string | null;
  selected: LableMessage[] = [];
}
