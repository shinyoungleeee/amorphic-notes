import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Note } from '../models';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-notes-new',
  templateUrl: './notes-new.component.html',
  styleUrls: ['./notes-new.component.css']
})
export class NotesNewComponent implements OnInit {
  @Input() note: Note;

  constructor(
    private router: Router,
    private noteService: NoteService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.note = new Note();
  }

  save(): void {
    this.noteService.createNote(this.note)
      .subscribe(note => this.router.navigate([`notes/${note._id}`]));
  }

  goBack(): void {
    this.location.back();
  }
}
