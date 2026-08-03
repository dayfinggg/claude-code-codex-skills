# Changing legacy code

Load this reference before changing poorly understood, weakly tested, or high-risk existing behavior.

Establish a characterization baseline first. Capture representative inputs, outputs, side effects, errors, and boundary conditions with focused tests or repeatable observations. Treat the baseline as evidence of current behavior, not proof that every observed behavior is intentional.

Find the smallest useful seam: an interface, dependency injection point, adapter, wrapper, configuration boundary, or observable output that permits safe characterization and change. Introduce a seam only when it reduces uncertainty or makes the requested change testable.

Keep the diff bounded to the behavior under investigation and the minimum supporting test or seam. Separate behavior-preserving refactoring from behavior change into distinct steps, diffs, or reviews when that makes the intent, rollback, or evidence clearer. Verify the characterization baseline after refactoring and verify the desired contract after the behavior change.

Sources: [Michael Feathers, *Working Effectively with Legacy Code*](https://www.oreilly.com/library/view/working-effectively-with/0131177052/) and [Martin Fowler, *Refactoring*](https://martinfowler.com/books/refactoring.html).
