<?php

class FrontNotesController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function getNotes()
	{
		return View::make('front.notes');
	}
	public function getNotesList($name)
	{
		return View::make('front.notes_list')->withCategory($name);
	}

	public function getNotesDetailList($parent,$sub)
	{
		$notes=Notes::where('subcategory',$sub)->where('status','active')->paginate(10);
		return View::make('front.notes_detail_list')->withParent($parent)->withChild($sub)->withNote($notes);
	}
	public function getSearch()
	{
		$search = Input::get('search');
		$notes=Notes::where('status','active')->search($search)->paginate(10);
		return View::make('front.search')->withNote($notes);
	}

	public function getNotesDetailPage($parent,$sub,$id)
	{
		return View::make('front.notes_detail_page')->withParent($parent)->withChild($sub)->withNote(Notes::where('id',$id)->first());
	}


	public function postRecommend($parent,$sub,$id)
	{
		
		Mail::send('front.emails.recommend', array('parent' => $parent,'child'=>$sub,'id'=>$id), function($message)
			{
			    $message->to(Input::get('email'))->subject(Auth::user()->name.' Recommended a notes');
			});
		Session::flash('recommend','success');
		return Redirect::back();
	}


	public function postReviews($parent,$sub,$id)
	{
		
		$review = new Review;
		$review->title = Input::get('title');
		$review->review = Input::get('review');
		$review->rating = Input::get('rating');
		$review->category = $parent;
		$review->subcategory = $sub;
		$review->notes_id = $id;
		$review->url =URL::to('/notes/'.$parent.'/'.$sub.'/'.$id) ;
		$review->user_name = Auth::user()->name;
		$review->user_email = Auth::user()->email;
		$review->status = 'inactive';
		$result=$review->save();
		if($result)
			Session::flash('review','success');
		else
			Session::flash('review','failed');
		return Redirect::back();
	}

	public function postReports($parent,$sub,$id)
	{
		
		$query = new Queries;
		$query->user_name = Auth::user()->name;
		$query->user_email = Auth::user()->email;
		$query->message = Input::get('message');
		$query->url =URL::to('/notes/'.$parent.'/'.$sub.'/'.$id) ;
		if(Input::get('type')==null){
			$query->type="claim";
		}
		else{
			$query->type = Input::get('type');
		}
		
		$query->status="not answered";
		$result=$query->save();
		if($result)
			Session::flash('query','success');
		else
			Session::flash('query','failed');
		return Redirect::back();
	}



}
