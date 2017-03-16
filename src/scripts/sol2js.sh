#!/usr/bin/perl
while (<>) {
  chomp;           # Remove newline
  s#/\*.*?\*/##sg; # Remove multiline comments
  s/\/\/.*$//go;   # Remove // comments
  s/\s+/ /go;      # Collapse space
  print;
}
print "\n";