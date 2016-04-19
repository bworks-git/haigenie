@extends('front.notes_master')

@section('breadcrumb')

<li><a href="/notes">Notes</a></li>

<li><a href="/notes/{{$parent}}/{{$child}}">{{$child}}</a></li>

<li>{{$note->title}}</li>

@stop

@section('main_content')

				<div class="col-lg-9 notes_sec">

					<div class="page-header hidden-print">

						<h2 class="">{{$parent}}</h2>

					</div>

					<div class="clearfix">						

						<div class="well bg_fff"> 

							<h3 class="notes_title no_border">{{$note->title}} </h3>

							<p class="cmts_show hidden-print">Posted by {{$note->created_user_name}}</p>

							<div class="row notes_smdesc">

								<div class="col-lg-12">

									<p class="">{{$note->content}}</p>		

									@if($note->attachment!="none")

									<p>Download : <a href="{{$note->attachment}}">click here</a></p>

									@endif

								</div>

							</div>

						</div>

						<?php /*

						<div class="well vote_blk hidden-print">

							

							<p> Favoured: <b>1</b> <a class="btn-link" title="Add as Favourite">Add as Favourite</a></p>

						</div>*/?>

						

						<div class="btns_blk hidden-print">

							<p>

								<a class="btn btn-default" title="" data-toggle="collapse" data-target="#reviewCollapse">Submit Review</a>

								<a class="btn btn-default" title="" data-toggle="modal" data-target="#recommendModal">Recommend</a>

								<a class="btn btn-default" title="" onclick="window.print();">Print</a>

								<a class="btn btn-default" title="" data-toggle="modal" data-target="#reportModal">Report</a>

								<a class="btn btn-default" title="" data-toggle="modal" data-target="#claimModal">Claim</a>

							</p>

						</div>

					

						<div class="collapse hidden-print" id="reviewCollapse">

							<div class="well bg_fff">

								<div class="review_form">

									<h2 class="">Comments</h2>

									<form role="form" action="/notes/reviews/{{$parent}}/{{$child}}/{{$note->id}}" method="POST">

									  <div class="form-group">

										<label for="title">Title:</label>

										<input type="text" name="title" class="form-control" id="title">

									  </div>

									  <div class="form-group">

										<label for="Review">Review:</label>

										<textarea class="form-control" name="review" id="Review"> </textarea>

									  </div>

									  <div class="form-group">

										<p><input type="text" class="kv-gly-heart rating-loading" value="{{2}}" data-size="xl" title="" name="rating"/> <span>Rating</span></p>

									  </div>

									  <div class="submit_blk">								

										<button type="submit" class="btn btn-success">Submit</button>

										<button type="reset" class="btn btn-danger">cancel</button>

									  </div>

									</form>

									

								</div>

							</div>

						</div>

						

						<div class="review_disblk hidden-print">

							<h2>Reviews <small>({{Review::where('subcategory',$child)->where('notes_id',$note->id)->where('status','active')->count()}})</small></h2>

							@if(Review::where('subcategory',$child)->where('notes_id',$note->id)->where('status','active')->count()==0) <h5>No Reviews</h5>

							@endif

							@foreach(Review::where('subcategory',$child)->where('notes_id',$note->id)->where('status','active')->get() as $review)

							<div class="user_rev_blk">

								<h5><a href="javascript:;" title="Arun">{{$review->user_name}}</a></h5>

								<p>{{$review->review}}</p>

								<p><input type="text" class="kv-gly-heart rating-loading" value="{{$review->rating}}" data-size="xl" title="" disabled /></p>

							</div>

							@endforeach

							

						</div>

					

					</div>

					

				</div>

			

	

		<!-- Recommend Modal start -->

	<div id="recommendModal" class="modal notes_modal fade hidden-print" role="dialog">

	  <div class="modal-dialog">

		<div class="modal-content">

		  <div class="modal-header">

			<button type="button" class="close" data-dismiss="modal">&times;</button>

			<h4 class="modal-title">Recommend To Friend</h4>

		  </div>

		  <div class="modal-body">

			

			<form class="form-horizontal" role="form" action="/notes/recommend/{{$parent}}/{{$child}}/{{$note->id}}" method="POST">

				  <div class="form-group">

					<label class="control-label col-sm-3" for="frndName">Friend Name:</label>

					<div class="col-sm-9">

					  <input type="text" class="form-control" name="name" id="frndName" placeholder="Friend Name">

					</div>

				  </div>

				  <div class="form-group">

					<label class="control-label col-sm-3" for="email">Email:</label>

					<div class="col-sm-9">

					  <input type="email" class="form-control" name="email" id="email" placeholder="Enter email">

					</div>

				  </div>

				  <div class="form-group">

					<div class="col-sm-offset-3 col-sm-9">

					  <button type="submit" class="btn btn-success">Recommend</button>

					</div>

				  </div>

			</form>

			

		  </div>

		  <div class="modal-footer">

			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>

		  </div>

		</div>



	  </div>

	</div>

	<!-- Recommend Modal end-->

	

	<!-- Report Modal start-->

	<div id="reportModal" class="modal notes_modal fade hidden-print" role="dialog">

	  <div class="modal-dialog">

		<div class="modal-content">

		  <div class="modal-header">

			<button type="button" class="close" data-dismiss="modal">&times;</button>

			<h4 class="modal-title">Report</h4>

		  </div>

		  <div class="modal-body">

		  

			<form class="form-horizontal" role="form" action="/notes/reports/{{$parent}}/{{$child}}/{{$note->id}}" method="post">

				  <div class="form-group">

					<label class="control-label col-sm-3" for="reason">Reason :</label>

					<div class="col-sm-9">

					  <select class="form-control" id="reason" name="type">

							<option value="Broken links">Broken links</option>

							<option value="Inaccurate information">Inaccurate information</option>

							<option value="Wrong category">Wrong category</option>

							<option value="Others">Others (Please specify below)</option>

					  </select>

					</div>

				  </div>

				  <div class="form-group">

					<label class="control-label" for="reportMsg">Message:</label>

					  <textarea class="form-control" id="reportMsg " name="message"> </textarea>

				  </div>

				  <div class="form-group">

					<div class="col-sm-9">

					  <button type="submit" class="btn btn-success">Report</button>

					</div>

				  </div>

			</form>

		  

		  </div>

		  <div class="modal-footer">

			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>

		  </div>

		</div>



	  </div>

	</div>

	<!-- Report Modal end-->

	

	<!-- Claim Modal start-->

	<div id="claimModal" class="modal notes_modal fade hidden-print" role="dialog">

	  <div class="modal-dialog">

		<div class="modal-content">

		  <div class="modal-header">

			<button type="button" class="close" data-dismiss="modal">&times;</button>

			<h4 class="modal-title">Claim</h4>

		  </div>

		  <div class="modal-body">

			

			<form class="" role="form"  action="/notes/reports/{{$parent}}/{{$child}}/{{$note->id}}" method="post">				  

				  <div class="form-group">

					<label class="control-label" for="reportMsg">Message:</label>

					  <textarea class="form-control" id="reportMsg" name="message"> </textarea>

				  </div>

				  <div class="form-group">

					<div class="col-sm-9">

					  <button type="submit" class="btn btn-success">Claim Listing</button>

					</div>

				  </div>

			</form>

			

		  </div>

		  <div class="modal-footer">

			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>

		  </div>

		</div>



	  </div>

	</div>

	<!-- Claim Modal end-->

@stop

@section('script')

	<script type="text/javascript" src="/front/js/star-rating.js"></script>

	<script>

		

		jQuery(document).ready(function(){

			/* Initialize Rating */ 

			 $("#rating_id1").rating();

			 $('.kv-gly-heart').rating({

				containerClass: 'is-heart',

				defaultCaption: '{rating} hearts',

				starCaptions: function (rating) {

					return rating == 1 ? 'One heart' : rating + ' hearts';

				},

			   filledStar: '<i class="fa fa-star"></i>',

				emptyStar: '<i class="fa fa-star-o"></i>' 

			});  

		});

		

	</script>

@stop	

